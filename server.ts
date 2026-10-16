import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// Initialize GoogleGenAI server-side with telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Kurikulum Merdeka Official Textbook Excerpts for RAG Grounding
const RAG_GROUNDING_DATA = `
DOKUMEN RUJUKAN RESMI: BUKU SISWA IPS KELAS 8 KURIKULUM MERDEKA (Kemendikbudristek)
TEMA: Penjelajahan Samudra, Kolonialisme, dan Imperialisme di Indonesia

1. LATAR BELAKANG KEDATANGAN BANGSA BARAT:
- Daya tarik Indonesia: rempah-rempah (cengkih, pala, lada, kayu manis). Di Eropa bernilai sangat tinggi karena cuaca dingin membutuhkan pengawet daging & penghangat tubuh.
- Jatuhnya Konstantinopel ke Kesultanan Utsmaniyah (1453) memutus jalur perdagangan rempah di Laut Tengah, membuat pedagang Eropa mencari jalur laut langsung ke Hindia Timur (Nusantara).
- Motivasi 3G:
  * Gold: mencari kekayaan (emas, rempah-rempah berharga).
  * Glory: mencari kejayaan negara dan kekuasaan maritim.
  * Gospel: menyebarkan agama nasrani.
- Revolusi IPTEK: Kompas, astrolabe, kapal karavel besar, dan teori Copernicus bumi bulat.

2. KRONOLOGI KEDATANGAN BANGSA EROPA:
- Portugis: Bartolomeu Dias (1488, Tanjung Harapan), Vasco da Gama (1498, Kalikut India), Alfonso de Albuquerque (1511, menaklukkan Melaka; 1512 sampai di Maluku: Ternate & Tidore).
- Spanyol: Ferdinand Magellan & Sebastian del Cano (1521, mendarat di Tidore Maluku). Terjadi perselisihan dengan Portugis yang diakhiri Perjanjian Saragosa (1529).
- Belanda: Cornelis de Houtman (1596, tiba di Pelabuhan Banten). Awalnya ditolak karena bersikap angkuh, namun kembali dengan armada dagang lebih terorganisir hingga mendirikan VOC pada 1602.
- Inggris: EIC (East India Company) sempat menguasai Nusantara di bawah Thomas Stamford Raffles (1811-1816), memperkenalkan sistem sewa tanah (Landrent) dan menulis History of Java.

3. KEBIJAKAN KOLONIAL:
- VOC (Vereenigde Oostindische Compagnie, 1602-1799): Diberi Hak Octrooi (hak istimewa) seperti mencetak uang, memiliki tentara, menyatakan perang, dan hak monopoli dagang.
- Monopoli Dagang: Petani dilarang menjual rempah ke pihak selain VOC. Harga ditentukan sepihak sangat rendah oleh VOC.
- Pelayaran Hongi (Hongitochten): Patroli armada kapal kora-kora bersenjata untuk mengawasi perdagangan gelap dan menegakkan monopoli.
- Ekstirpasi: Hak VOC memusnahkan pohon rempah jika stok melimpah agar harga di Eropa tetap tinggi.
- Cultuurstelsel (Tanam Paksa 1830 oleh Van den Bosch): Petani diwajibkan menanam komoditas ekspor (kopi, tebu, nila) pada 1/5 tanahnya. Menyebabkan penderitaan dan kelaparan hebat di Jawa (Cirebon, Demak).
- Devide et Impera: Politik adu domba antar kerajaan lokal untuk melemahkan perlawanan.

4. KONTEKSTUALISASI LOKAL (BANJAR & SEKITAR KITA):
- Kesultanan Banjar (Kalimantan Selatan): Belanda berusaha memonopoli tambang batu bara dan lada di Martapura/Banjarmasin, memicu Perang Banjar (1859-1905) yang dipimpin Pangeran Antasari dan Demang Lehman.
- Jejak linguistik serapan: Portugis (gereja, jendela, mentega, lemar/armario, sepatu, meja, bendera, kemeja). Belanda (kantor, handuk, kulkas, arloji, asbak, buncis, gratis, knalpot).
`;

// Helper: Pedagogical fallback responses if API key is absent or offline
function generateSmartFallback(stage: number, message: string, studentName: string = 'Siswa') {
  const lower = message.toLowerCase();

  if (stage === 1) {
    if (lower.includes('daging') || lower.includes('awet') || lower.includes('dingin') || lower.includes('musim')) {
      return {
        text: `Tepat sekali analisis pemikiranmu, ${studentName}! 🌟\n\nPada musim dingin di Eropa, suhu yang membeku membuat ternak harus disembelih dan dagingnya diawetkan. Rempah seperti pala dan cengkih dari Maluku memiliki kandungan minyak atsiri yang menjadi antibakteri alami terbaik di dunia saat itu!\n\nDitambah lagi dengan jatuhnya kota **Konstantinopel (1453)**, jalur rempah darat ditutup oleh Turki Utsmani. Akibatnya persediaan sangat langka dan harganya melambung setara emas murni.\n\nSekarang, menurutmu apa yang terpikir oleh para pelaut Eropa setelah jalur darat tersebut ditutup?`,
        suggestedNext: 'Apakah mereka mencari jalur laut langsung ke pulau asal rempah?',
        xpBonus: 25,
      };
    }
    if (lower.includes('3g') || lower.includes('gold') || lower.includes('glory') || lower.includes('gospel')) {
      return {
        text: `Hebat ${studentName}, kamu mengingat pilar utama semboyan 3G! 👑\n\n1. **Gold**: Memburu kekayaan ekonomi (rempah-rempah).\n2. **Glory**: Kejayaan bangsa maritim di mata dunia.\n3. **Gospel**: Menyebarkan keyakinan agama ke belahan timur.\n\nJika kamu menjadi kapten kapal penjelajah waktu itu, faktor mana menurutmu yang paling kuat memotivasi para pedagang membiayai ekspedisi berbahaya menyeberangi samudra?`,
        suggestedNext: 'Faktor Gold dan perdagangan rempah',
        xpBonus: 20,
      };
    }
  }

  if (stage === 2) {
    if (lower.includes('melaka') || lower.includes('malaka') || lower.includes('portugis') || lower.includes('1511') || lower.includes('alfonso')) {
      return {
        text: `Tepat sekali, ${studentName}! Alfonso de Albuquerque menaklukkan Selat Malaka pada tahun 1511 ⛵.\n\nMalaka adalah pintu gerbang jalur maritim tersibuk di Asia Tenggara. Siapapun yang menguasai Selat Malaka bisa mengontrol kapal-kapal dagang dari Tiongkok, India, dan kepulauan Nusantara.\n\nDari Malaka, bangsa Portugis segera mengirim ekspedisi ke timur menuju Kepulauan Maluku (Ternate & Tidore) pada tahun 1512. Menurutmu, mengapa mereka tidak puas hanya berdagang di Malaka saja?`,
        suggestedNext: 'Karena ingin memotong perantara dan langsung ke sumber penghasil rempah di Maluku!',
        xpBonus: 25,
      };
    }
  }

  if (stage === 3) {
    if (lower.includes('monopoli') || lower.includes('sendiri') || lower.includes('rugi') || lower.includes('petani')) {
      return {
        text: `Pemahaman konsep yang sangat tajam, ${studentName}! 📜\n\nMonopoli dagang VOC berarti rakyat Maluku **hanya boleh** menjual cengkih dan pala kepada VOC. Jika pedagang Inggris atau Makassar menawarkan harga 5 kali lebih tinggi, petani tetap dilarang menjualnya!\n\nVOC bahkan melakukan **Pelayaran Hongi** dengan perahu kora-kora untuk berpatroli, dan jika ada rakyat yang menanam melebihi kuota, VOC melakukan **Ekstirpasi** (menebang pohon cengkih milik rakyat).\n\nApa dampak jangka panjang tindakan ini terhadap perekonomian dan kesejahteraan rakyat Maluku?`,
        suggestedNext: 'Rakyat jatuh miskin dan kelaparan karena harga ditekan sepihak oleh VOC.',
        xpBonus: 30,
      };
    }
  }

  if (stage === 4) {
    if (lower.includes('banjar') || lower.includes('antasari') || lower.includes('serapan') || lower.includes('belanda')) {
      return {
        text: `Luar biasa ${studentName}! Hubungan kontekstual dengan sejarah lokal Banjar sangat baik 🏰.\n\nDi Tanah Banjar (Kalimantan Selatan), Belanda sangat tergiur dengan lada dan cadangan batu bara di tambang Oranje Nassau (Pengaron). Hal inilah yang memicu **Perang Banjar (1859-1905)** di mana Pangeran Antasari menggelorakan semboyan legendaris: *"Haram Manyarah Waja Sampai Kaputing!"*\n\nBahkan kata-kata sehari-hari kita seperti *kantor, handuk, kulkas, jendela, ember* merupakan bukti jejak sejarah kontak bahasa Nusantara dengan bangsa Eropa.\n\nBagaimana perasaanmu setelah menelusuri sejarah dari masa rempah hingga ke masa sekarang?`,
        suggestedNext: 'Ternyata sejarah bukan cuma hafalan tahun, tapi cerita nyata yang dampaknya masih ada sampai sekarang!',
        xpBonus: 35,
      };
    }
  }

  // General Socratic guidance
  return {
    text: `Pertanyaan dan pandangan yang menarik, ${studentName}! 💡\n\nDalam kajian IPS Kelas 8 Kurikulum Merdeka, kita melihat bahwa peristiwa sejarah selalu memiliki hubungan **sebab dan akibat** (kausalitas). Rempah-rempah bukan sekadar bumbu masakan, melainkan komoditas strategis dunia pada abad ke-16 layaknya minyak bumi saat ini.\n\nCoba renungkan: Bagaimana keadaan alam di Nusantara yang subur dan iklim tropis memungkinkan pohon pala dan cengkih hanya bisa tumbuh di tempat tertentu di bumi ini?`,
    suggestedNext: 'Apakah karena kondisi tanah vulkanik dan iklim tropis kepulauan?',
    xpBonus: 15,
  };
}

// API Route: AI Tutor Chat (Socratic Dialogue with RAG grounding)
app.post('/api/tutor/chat', async (req, res) => {
  try {
    const { 
      message, 
      stage = 1, 
      history = [],
      studentName = 'Ahmad',
      studentClass = 'Kelas 8B'
    } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Pesan siswa diperlukan.' });
    }

    if (process.env.GEMINI_API_KEY) {
      try {
        const stageDescriptions = [
          'Tahap 1: Pemantik & Konteks (Mengapa rempah lebih berharga dari emas, musim dingin Eropa, Konstantinopel 1453, konsep 3G).',
          'Tahap 2: Cerita Jalur Rempah (Kronologi ekspedisi Portugis 1511 Malaka, Spanyol 1521, Belanda 1596 Banten, perebutan rute).',
          'Tahap 3: Visualisasi Kebijakan (Monopoli dagang VOC, hak octrooi, pelayaran Hongi, ekstirpasi, tanam paksa Cultuurstelsel).',
          'Tahap 4: Kontekstualisasi Sejarah (Jejak kolonial di Kesultanan Banjar Kalsel, Perang Banjar, kata serapan, warisan arsitektur).'
        ];

        const systemInstruction = `
Kamu adalah "Pak Guru AI", guru mata pelajaran IPS Kelas 8 di SMPN 4 Awayan (Kabupaten Balangan, Kalimantan Selatan).
Kamu mengajar materi: "Penjelajahan Samudra & Kolonialisme Barat di Nusantara" berdasarkan Kurikulum Merdeka.
Siswa yang sedang berdialog denganmu bernama: "${studentName}" (${studentClass}). Panggil dia dengan nama "${studentName}" secara santun dan menyemangati.

PEDAGOGICAL RULES (WAJIB DIPATUHI):
1. PENDEKATAN SOCRATIC: JANGAN PERNAH langsung memberikan jawaban instan atau membocorkan jawaban lengkap jika siswa bertanya pertanyaan kuis atau meminta solusi.
2. PANDU SISWA BERTINGKAT: Berikan apresiasi pada pemikiran siswa, validasi bagian yang sudah benar, lalu ajukan pertanyaan pemicu nalar (scaffolding question) untuk membimbing siswa menemukan kesimpulan sendiri.
3. GUNAKAN ANALOGI KONKRET: Gunakan analogi kehidupan nyata siswa SMP (contoh: kantin sekolah monopoli es teh, menabung di celengan, cuaca dingin pegunungan).
4. RAMAH DAN MENDUKUNG: Gaya bahasa santun, ramah, mengayomi, khas guru Indonesia yang suportif kepada ${studentName}.
5. TAHAP PEMBELAJARAN SAAT INI: ${stageDescriptions[stage - 1] || stageDescriptions[0]}.
6. SELALU BERPIJAK PADA SUMBER RAG:
${RAG_GROUNDING_DATA}

Format output: Berikan jawaban berupa penjelasan dialog yang membina, dan di akhir sertakan satu pertanyaan pemantik atau tantangan nalar singkat.`;

        // Build conversation messages
        const conversationParts = [];
        if (Array.isArray(history) && history.length > 0) {
          for (const item of history.slice(-4)) {
            conversationParts.push(`${item.sender === 'user' ? `Siswa (${studentName})` : 'Pak Guru AI'}: ${item.text}`);
          }
        }
        conversationParts.push(`Siswa (${studentName}): ${message}`);

        const prompt = conversationParts.join('\n\n');

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            systemInstruction,
            temperature: 0.7,
            topP: 0.9,
          },
        });

        const outputText = response.text || '';
        return res.json({
          text: outputText,
          sourceTag: 'Buku Siswa IPS Kelas 8 Kemendikbudristek (Kurikulum Merdeka)',
          xpBonus: 20,
        });
      } catch (geminiError: any) {
        console.warn('Gemini API call encountered an issue, using pedagogical fallback:', geminiError?.message || geminiError);
        const fallback = generateSmartFallback(stage, message, studentName);
        return res.json({
          text: fallback.text,
          sourceTag: 'Buku Siswa IPS Kelas 8 Kemendikbudristek',
          xpBonus: fallback.xpBonus,
          suggestedNext: fallback.suggestedNext,
        });
      }
    } else {
      // Smart pedagogical fallback
      const fallback = generateSmartFallback(stage, message, studentName);
      return res.json({
        text: fallback.text,
        sourceTag: 'Buku Siswa IPS Kelas 8 Kemendikbudristek',
        xpBonus: fallback.xpBonus,
        suggestedNext: fallback.suggestedNext,
      });
    }
  } catch (err: any) {
    console.error('Tutor chat handler error:', err);
    res.status(500).json({ error: 'Terjadi kendala pada layanan AI Tutor.' });
  }
});

// API Route: Scaffolded Hints (Level 1, 2, 3)
app.post('/api/tutor/hint', (req, res) => {
  const { stage = 1, hintLevel = 1 } = req.body;

  const hintCatalog: Record<number, Record<number, string>> = {
    1: {
      1: '💡 **Petunjuk Awal:** Pikirkan tentang musim dingin ekstrem di daratan Eropa dan kebutuhan mengawetkan makanan tanpa kulkas modern!',
      2: '💡 **Petunjuk Analogi:** Jika kamu punya banyak daging sapi tapi tidak punya garam atau rempah, daging itu akan membusuk dalam beberapa hari. Pala & cengkih adalah pengawet alami terbaik dan langka!',
      3: '💡 **Petunjuk Konseptual:** Setelah Konstantinopel dikuasai Kesultanan Utsmani (1453), bangsa Eropa kehilangan akses rempah murah. Siapapun yang menemukan langsung sumbernya akan menjadi negara paling kaya di dunia!',
    },
    2: {
      1: '💡 **Petunjuk Awal:** Mengapa Portugis harus berlayar jauh memutari benua Afrika daripada membeli di pasar Venesia atau Kairo?',
      2: '💡 **Petunjuk Analogi:** Beli langsung dari kebun petani tentu jauh lebih murah daripada beli dari calo/tengkulak ke-5!',
      3: '💡 **Petunjuk Konseptual:** Dengan menaklukkan Malaka (1511), Alfonso de Albuquerque menguasai gerbang timur ke Maluku tempat cengkih dan pala tumbuh subur.',
    },
    3: {
      1: '💡 **Petunjuk Awal:** Bayangkan hanya ada satu toko tunggal yang boleh membeli hasil panenmu dengan harga yang mereka tentukan sendiri!',
      2: '💡 **Petunjuk Analogi:** Petani menanam selama 6 bulan, tapi dipaksa menjual seharga Rp 1.000, padahal pedagang lain mau membeli seharga Rp 10.000. Itulah monopoli!',
      3: '💡 **Petunjuk Konseptual:** Hak Octrooi memberi VOC kuasa seperti negara: armada perang kora-kora (Pelayaran Hongi) menegakkan larangan perdagangan bebas rakyat.',
    },
    4: {
      1: '💡 **Petunjuk Awal:** Perhatikan kata-kata di sekeliling rumah dan sekolahmu, adakah kata yang mirip bahasa asing?',
      2: '💡 **Petunjuk Analogi:** Orang Belanda menyebut kantor "kantoor", dan orang Portugis menyebut jendela "janela"!',
      3: '💡 **Petunjuk Konseptual:** Di Kalimantan Selatan, Kesultanan Banjar melawan upaya VOC menguasai tambang batu bara dan lada dalam Perang Banjar yang dipimpin Pangeran Antasari.',
    },
  };

  const text = hintCatalog[stage]?.[hintLevel] || hintCatalog[1][1];
  res.json({ hint: text, hintLevel });
});

// Start dev or production server
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server NusantaraQuest berjalan di http://0.0.0.0:${PORT}`);
  });
}

startServer();
