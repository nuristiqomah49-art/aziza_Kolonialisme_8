import { StoryStage, RAGSource, HOTSQuestion, StudentRecord } from '../types';

export const ALL_RAG_SOURCES: RAGSource[] = [
  {
    id: 'src-1',
    title: 'Buku Siswa IPS Kelas 8 Kurikulum Merdeka',
    publisher: 'Kemendikbudristek RI (Dokumen Resmi)',
    badge: 'Buku Teks Utama',
    pageRef: 'Hal. 142 - 156',
    excerpt: 'Tema II: Kemajemukan Masyarakat Indonesia & Penjelajahan Samudra Bangsa Barat. Mengulas latar belakang 3G (Gold, Glory, Gospel) dan dampaknya bagi Nusantara.',
    fullContent: 'Daya tarik rempah-rempah: Cengkih dan pala merupakan tanaman endemik Kepulauan Maluku yang pada abad ke-15 hingga 17 sangat langka di dunia. Bangsa Eropa membutuhkan rempah ini untuk mengawetkan daging selama musim dingin, menghangatkan tubuh, dan campuran obat medis. Setelah jatuhnya Konstantinopel ke Kesultanan Utsmaniyah pada tahun 1453, jalur perdagangan darat dan Laut Tengah ditutup bagi pedagang Eropa Kristen, memaksa mereka mencari jalur laut langsung ke sumber rempah di timur.'
  },
  {
    id: 'src-2',
    title: 'Modul Sejarah Maritim & Jalur Rempah',
    publisher: 'Direktorat Jenderal Kebudayaan RI',
    badge: 'Riset Sejarah',
    pageRef: 'Bab 3 Maritim Nusantara',
    excerpt: 'Kronologi ekspedisi maritim: Bartolomeu Dias (1488), Vasco da Gama (1498), Alfonso de Albuquerque (1511), dan Cornelis de Houtman (1596).',
    fullContent: 'Pada tahun 1511, Portugis di bawah pimpinan Alfonso de Albuquerque berhasil menaklukkan Bandar Melaka, simpul perdagangan tersibuk di Asia Tenggara. Setahun kemudian (1512), armada Portugis sampai di Ternate dan Tidore (Maluku). Persaingan dengan Spanyol yang tiba tahun 1521 memicu Perjanjian Saragosa (1529) yang menetapkan Maluku di bawah pengaruh Portugis dan Filipina di bawah Spanyol.'
  },
  {
    id: 'src-3',
    title: 'Analisis Kebijakan Monopoli VOC & Tanam Paksa',
    publisher: 'Pusat Kurikulum & Pembelajaran SMP',
    badge: 'Analisis Konsep',
    pageRef: 'Suplemen HOTS Guru',
    excerpt: 'Penjelasan hak istimewa VOC (Hak Octrooi), Pelayaran Hongi, Ekstirpasi, serta politik adu domba (Devide et Impera).',
    fullContent: 'Monopoli dagang VOC diwujudkan melalui penentuan kuota panen dan larangan menjual kepada pihak asing mana pun. Pelayaran Hongi menggunakan perahu bersenjata kora-kora untuk memburu penyelundup rempah, sementara hak Ekstirpasi mengizinkan VOC menebang pohon pala dan cengkih rakyat jika stok berlebih agar harga di Amsterdam tetap selangit.'
  },
  {
    id: 'src-4',
    title: 'Sejarah Perlawanan Lokal & Kesultanan Banjar',
    publisher: 'Balai Pelestarian Nilai Budaya Kalimantan Selatan',
    badge: 'Muatan Lokal',
    pageRef: 'Arsip Perang Banjar 1859',
    excerpt: 'Perlawanan rakyat Banjar dan Pangeran Antasari terhadap campur tangan kolonial Belanda dalam monopoli tambang dan suksesi kesultanan.',
    fullContent: 'Di wilayah Kalimantan Selatan, Belanda mendirikan benteng pertahanan di Tabanio dan berupaya menguasai konsesi pertambangan batu bara di Pengaron serta perkebunan lada. Hal ini memicu Perang Banjar (1859-1905) di bawah kepemimpinan Pangeran Antasari dengan semboyan perjuangan "Haram Manyarah Waja Sampai Kaputing".'
  }
];

export const STORY_STAGES: Record<number, StoryStage> = {
  1: {
    id: 1,
    title: 'Tahap 1: Pemantik & Konteks',
    subtitle: 'Mengapa Rempah Lebih Mahal dari Emas di Eropa?',
    duration: '10 Menit',
    sources: [ALL_RAG_SOURCES[0], ALL_RAG_SOURCES[2]],
    initialMessage: 'Halo Ahmad! 👋 Selamat datang di petualangan sejarah IPS Kelas 8 NusantaraQuest!\n\nSebelum kita membahas kapal-kapal besar Eropa, coba bayangkan dulu: Kenapa ya biji pala dan tangkai cengkih yang kecil dari Maluku dulu harganya bisa **lebih mahal daripada emas murni** di Eropa saat musim dingin? Coba tebak menurut logikamu!',
    anchorEmoji: '🌶️ 👑 💰',
    anchorTitle: 'Konteks Suhu Dingin Eropa & Rempah Maluku',
    anchorText: 'Di Eropa abad pertengahan, suhu musim dingin mencapai titik beku ekstrem. Daging ternak harus diawetkan tanpa teknologi kulkas. Pala & cengkih memiliki minyak atsiri antibakteri terbaik yang membuat daging awet berbulan-bulan.',
    analogTitle: 'Analogi Botol Air di Tengah Gurun Pasir:',
    analogText: 'Sebotol air mineral biasa mungkin berharga murah di minimarket kota, tapi di tengah gurun pasir kering di mana tidak ada air sama sekali, orang rela menukar apa saja demi sebotol air itu. Begitulah kondisi rempah di Eropa setelah jalur darat Konstantinopel ditutup!',
    isUnlocked: true,
  },
  2: {
    id: 2,
    title: 'Tahap 2: Cerita Jalur Rempah',
    subtitle: 'Alfonso de Albuquerque & Jatuhnya Melaka (1511)',
    duration: '15 Menit',
    sources: [ALL_RAG_SOURCES[0], ALL_RAG_SOURCES[1]],
    initialMessage: 'Hebat, Ahmad! Sekarang kita masuk ke **Tahap 2: Cerita Jalur Rempah** 🚢.\n\nPada tahun 1511, Laksamana Portugis bernama **Alfonso de Albuquerque** berhasil merebut Bandar Melaka. Menurutmu, mengapa bangsa Portugis tidak membeli rempah dari pedagang di Laut Tengah saja, melainkan rela berlayar bertahun-tahun menembus ombak samudra ganas ke Asia?',
    anchorEmoji: '⛵ ⚔️ 🏰',
    anchorTitle: 'Rute Maritim Portugis ke Nusantara',
    anchorText: 'Lisabon (Portugis) ➔ Mengitari Tanjung Harapan (Afrika Selatan) ➔ Samudra Hindia ➔ Kalikut (India) ➔ Selat Melaka (1511) ➔ Ternate & Tidore Maluku (1512).',
    analogTitle: 'Analogi Membeli Langsung ke Petani:',
    analogText: 'Membeli buah dari toko ke-4 harganya naik berkali-kali lipat karena tiap pedagang perantara mengambil untung. Portugis ingin memotong semua rantai perantara itu dengan langsung mendatangi "kebun utama" di Nusantara!',
    isUnlocked: true,
  },
  3: {
    id: 3,
    title: 'Tahap 3: Visualisasi Kebijakan',
    subtitle: 'Membedah Monopoli Dagang VOC & Hak Octrooi',
    duration: '15 Menit',
    sources: [ALL_RAG_SOURCES[0], ALL_RAG_SOURCES[2]],
    initialMessage: 'Mari kita telaah konsep yang sering muncul dalam ujian: **Monopoli Dagang VOC** 📜.\n\nVOC membuat aturan bahwa rakyat Maluku HANYA boleh menjual rempah kepada VOC dengan harga murah yang ditentukan sepihak. Jika rakyat menjual ke pedagang Inggris atau Makassar yang berani bayar mahal, perahu perang VOC (Pelayaran Hongi) akan menghancurkan kebun mereka.\n\nMenurutmu, bagaimana perasaan dan masa depan para petani rempah saat menghadapi sistem seperti ini?',
    anchorEmoji: '🏛️ 📜 ⚖️',
    anchorTitle: 'Struktur Monopoli VOC vs Perdagangan Bebas',
    anchorText: 'Monopoli = Hak tunggal mutlak pembeli menentukan kuota panen, harga beli murah, serta larangan pedagang lain masuk.',
    analogTitle: 'Analogi Kantin Sekolah Monopoli:',
    analogText: 'Bayangkan sekolahmu melarang semua orang bawa bekal dan hanya mengizinkan 1 kantin menjual es teh. Kantin itu bebas menaikkan harga sesukanya dan kamu dilarang membeli dari tempat lain. Itulah Monopoli Perdagangan!',
    isUnlocked: false,
  },
  4: {
    id: 4,
    title: 'Tahap 4: Kontekstualisasi',
    subtitle: 'Jejak Kolonial di Tanah Banjar & Sekitar Kita',
    duration: '10 Menit',
    sources: [ALL_RAG_SOURCES[0], ALL_RAG_SOURCES[3]],
    initialMessage: 'Tahap Terakhir! **Kontekstualisasi Sejarah** 🏘️.\n\nTahu tidak Ahmad, jejak sejarah kolonial ini tidak hanya terjadi di Jawa atau Maluku, tapi sangat dekat dengan kita di **Kalimantan Selatan**! Belanda berebut tambang dan lada hingga memicu Perang Banjar.\n\nSelain itu, banyak kata bahasa kita sehari-hari adalah serapan Belanda dan Portugis, seperti *kantor, handuk, meja, jendela, lemari*.\n\nCoba sebutkan 1 benda di rumahmu atau kata yang kamu ketahui yang kira-kira berasal dari kontak sejarah tersebut!',
    anchorEmoji: '🏛️ 💬 🇮🇩',
    anchorTitle: 'Korelasi Lokal: Kesultanan Banjar & Kosakata Modern',
    anchorText: 'Pangeran Antasari memimpin rakyat Banjar menolak dominasi Belanda. Kosakata serapan membuktikan interaksi panjang budaya maritim dan kolonial dalam kehidupan sehari-hari.',
    analogTitle: 'Analogi Jejak Jejak yang Tak Terhapus:',
    analogText: 'Seperti jejak kaki di atas semen basah yang mengering, sejarah masa lalu membentuk kata-kata yang kita ucapkan dan kota tempat kita tinggal sekarang.',
    isUnlocked: false,
  }
};

export const HOTS_QUESTIONS: HOTSQuestion[] = [
  {
    id: 1,
    title: 'Soal 1 • Analisis Kausalitas Monopoli Dagang',
    stageTopic: 'Kebijakan Monopoli VOC',
    bloomTaxonomy: 'C4 (Menganalisis)',
    question: 'Pada abad ke-17, VOC melarang para petani di Kepulauan Maluku menjual cengkih dan pala kepada pedagang lain selain VOC, meski pihak lain berani menawar harga 4 kali lebih tinggi. Kebijakan ini diperkuat dengan Pelayaran Hongi. Apa dampak sistemik paling merugikan yang diderita oleh masyarakat lokal akibat kebijakan ini?',
    xp: 50,
    options: [
      {
        key: 'A',
        text: 'Rakyat Maluku bertambah makmur karena seluruh hasil panennya pasti dibeli oleh kapal dagang VOC.',
        isCorrect: false,
        explanation: 'Kurang tepat. Ketika pembeli hanya ada satu pihak tunggal (monopsoni/monopoli), pembeli bebas menekan harga serendah mungkin sehingga petani justru menderita kemiskinan parah.'
      },
      {
        key: 'B',
        text: 'Hilangnya kemerdekaan ekonomi petani, timbulnya kemiskinan dan kelaparan hebat, serta hancurnya tatanan perdagangan tradisional antarpulau.',
        isCorrect: true,
        explanation: 'Sangat Tepat! Jawaban HOTS sempurna. Monopoli mematikan mekanisme pasar sehat, merampas kebebasan petani, dan Pelayaran Hongi merusak kedaulatan kerajaan-kerajaan maritim lokal.'
      },
      {
        key: 'C',
        text: 'Para petani dapat dengan mudah beralih menanam komoditas lain tanpa ada sanksi atau pengawasan dari VOC.',
        isCorrect: false,
        explanation: 'Kurang tepat. VOC menerapkan hak Ekstirpasi, yaitu menebang paksa pohon yang berlebih dan mengawasi ketat tanaman petani dengan patroli senjata kora-kora.'
      }
    ]
  },
  {
    id: 2,
    title: 'Soal 2 • Evaluasi Strategi Perlawanan Nusantara',
    stageTopic: 'Kedatangan Bangsa Eropa & Perlawanan',
    bloomTaxonomy: 'C5 (Mengevaluasi)',
    question: 'Sebelum abad ke-20, perlawanan rakyat Nusantara (seperti Perang Diponegoro, Perang Padri, Perang Banjar, dan Perlawanan Sultan Hasanuddin) sangat gigih namun pada akhirnya dapat dipadamkan oleh pemerintah kolonial Belanda. Berdasarkan telaah konsep sejarah, faktor mendasar apa yang menyebabkan hal tersebut?',
    xp: 50,
    options: [
      {
        key: 'A',
        text: 'Perjuangan masih bersifat kedaerahan (lokal), tergantung pada figur pemimpin kharismatik, dan mudah dipecah belah oleh politik Devide et Impera Belanda.',
        isCorrect: true,
        explanation: 'Benar sekali! Kelemahan utama perjuangan era pra-kebangkitan nasional adalah sifatnya yang masih kedaerahan dan belum ada rasa persatuan nasional, sehingga Belanda dengan licik mengadu domba antarsaudara.'
      },
      {
        key: 'B',
        text: 'Rakyat Nusantara tidak memiliki keberanian bertempur dan persenjataan tradisional sama sekali tidak mampu melukai lawan.',
        isCorrect: false,
        explanation: 'Tidak benar. Semangat juang rakyat sangat perkasa dan pertempuran berlangsung bertahun-tahun bahkan membuat kas keuangan Belanda bangkrut.'
      },
      {
        key: 'C',
        text: 'Kerajaan-kerajaan lokal di Nusantara menyambut baik seluruh kebijakan kolonial Belanda.',
        isCorrect: false,
        explanation: 'Salah. Bukti perlawanan bersenjata terjadi di hampir seluruh pelosok kepulauan Nusantara menentang penjajahan.'
      }
    ]
  },
  {
    id: 3,
    title: 'Soal 3 • Analisis Hubungan Geopolitik Dunia',
    stageTopic: 'Latar Belakang Penjelajahan Samudra',
    bloomTaxonomy: 'C4 (Menganalisis Sebab-Akibat)',
    question: 'Jatuhnya kota Konstantinopel ke tangan Kesultanan Utsmaniyah pada tahun 1453 sering disebut sejarawan sebagai pemicu utama dimulainya Era Penjelajahan Samudra bangsa Eropa. Mengapa peristiwa di benua lain tersebut berdampak langsung terhadap kedatangan kapal-kapal Eropa ke kepulauan Indonesia?',
    xp: 50,
    options: [
      {
        key: 'A',
        text: 'Karena rempah-rempah Maluku diperjualbelikan melalui jalur dagang Laut Tengah yang pintunya berada di Konstantinopel, sehingga penutupannya memaksa bangsa Eropa mencari jalur laut baru ke sumber aslinya.',
        isCorrect: true,
        explanation: 'Analisis Cemerlang! Konstantinopel adalah gerbang utama penghubung dagang Barat dan Timur. Penutupannya menyebabkan kelangkaan rempah yang parah di Eropa dan mendorong revolusi pelayaran samudra.'
      },
      {
        key: 'B',
        text: 'Karena bangsa Eropa ingin melarikan diri dari benua Eropa dan menetap selamanya di Indonesia sebagai petani rempah.',
        isCorrect: false,
        explanation: 'Keliru. Tujuan utama mereka adalah mencari sumber daya ekonomi (Gold), menyebarkan pengaruh (Glory), dan agama (Gospel) untuk dibawa kembali kejayaannya ke negara asal.'
      }
    ]
  },
  {
    id: 4,
    title: 'Soal 4 • Kontekstualisasi Muatan Lokal Banjar',
    stageTopic: 'Jejak Kolonial di Tanah Banjar',
    bloomTaxonomy: 'C4 (Korelasional)',
    question: 'Di Kalimantan Selatan, Perang Banjar meletus pada 1859 dipimpin oleh Pangeran Antasari. Jika dikaitkan dengan faktor ekonomi kolonialisme, apakah sumber daya utama yang diperebutkan Belanda di Tanah Banjar?',
    xp: 50,
    options: [
      {
        key: 'A',
        text: 'Cadangan batu bara di tambang Oranje Nassau (Pengaron) dan jalur perdagangan komoditas lada yang sangat menguntungkan.',
        isCorrect: true,
        explanation: 'Tepat sekali! Revolusi Industri di Eropa membuat batu bara menjadi bahan bakar kapal uap yang sangat vital, dan Belanda ingin menguasai tambang batu bara Pengaron serta memonopoli perdagangan lada Banjar.'
      },
      {
        key: 'B',
        text: 'Belanda ingin mendirikan perkebunan teh dan kopi di puncak pegunungan Meratus.',
        isCorrect: false,
        explanation: 'Kurang tepat. Faktor utama pemicu ketegangan di Banjar adalah konsesi tambang batu bara dan campur tangan Belanda dalam suksesi tahta kesultanan.'
      }
    ]
  }
];

export const INITIAL_STUDENTS: StudentRecord[] = [
  {
    id: 'std-1',
    name: 'Ahmad',
    classRoom: 'Kelas 8B',
    currentStage: 1,
    xp: 450,
    monopolyMastery: 'Mahir',
    chronologyMastery: 'Mulai Berkembang',
    criticalThinking: 'Mahir',
    hintsUsed: 1,
    lastActive: '5 Menit lalu',
    badgesCount: 1,
  },
  {
    id: 'std-2',
    name: 'Siti Nurhaliza',
    classRoom: 'Kelas 8B',
    currentStage: 3,
    xp: 620,
    monopolyMastery: 'Perlu Bimbingan',
    chronologyMastery: 'Mahir',
    criticalThinking: 'Mulai Berkembang',
    hintsUsed: 3,
    lastActive: '12 Menit lalu',
    badgesCount: 2,
  },
  {
    id: 'std-3',
    name: 'Budi Santoso',
    classRoom: 'Kelas 8B',
    currentStage: 4,
    xp: 850,
    monopolyMastery: 'Mahir',
    chronologyMastery: 'Mahir',
    criticalThinking: 'Mahir',
    hintsUsed: 0,
    lastActive: '1 Jam lalu',
    badgesCount: 4,
  },
  {
    id: 'std-4',
    name: 'Rahmat Hidayat',
    classRoom: 'Kelas 8B',
    currentStage: 2,
    xp: 380,
    monopolyMastery: 'Mulai Berkembang',
    chronologyMastery: 'Perlu Bimbingan',
    criticalThinking: 'Mulai Berkembang',
    hintsUsed: 2,
    lastActive: '2 Jam lalu',
    badgesCount: 1,
  },
  {
    id: 'std-5',
    name: 'Aisyah Putri',
    classRoom: 'Kelas 8B',
    currentStage: 3,
    xp: 590,
    monopolyMastery: 'Mahir',
    chronologyMastery: 'Mulai Berkembang',
    criticalThinking: 'Mahir',
    hintsUsed: 1,
    lastActive: '30 Menit lalu',
    badgesCount: 2,
  }
];

export const HISTORICAL_ROUTE_WAYPOINTS = [
  {
    id: 'lisbon',
    name: 'Lisabon (Portugis)',
    year: '1488 - 1498',
    lat: 38.7,
    lng: -9.1,
    x: 12,
    y: 35,
    description: 'Titik tolak ekspedisi bangsa Portugis ke timur dengan kapal karavel besar dipelopori Pangeran Henry Sang Navigator.',
    badge: 'Titik Awal'
  },
  {
    id: 'cape',
    name: 'Tanjung Harapan (Afrika Selatan)',
    year: '1488 (Bartolomeu Dias)',
    lat: -34.3,
    lng: 18.4,
    x: 28,
    y: 75,
    description: 'Titik paling selatan benua Afrika yang berhasil diputari Bartolomeu Dias, membuka jalan ke Samudra Hindia.',
    badge: 'Penjelajahan Awal'
  },
  {
    id: 'calicut',
    name: 'Kalikut / Goa (India)',
    year: '1498 (Vasco da Gama)',
    lat: 11.2,
    lng: 75.7,
    x: 52,
    y: 45,
    description: 'Pusat perdagangan rempah India dan pangkalan dagang pertama Portugis di Asia sebelum bergerak ke timur.',
    badge: 'Pusat Transit'
  },
  {
    id: 'malacca',
    name: 'Bandar Melaka (Malaysia/Sumatera)',
    year: '1511 (Alfonso de Albuquerque)',
    lat: 2.2,
    lng: 102.2,
    x: 74,
    y: 54,
    description: 'Pintu gerbang maritim Selat Malaka ditaklukkan Portugis 1511. Mengontrol seluruh kapal dagang rempah ke Asia Timur.',
    badge: 'Kunci Jalur Rempah'
  },
  {
    id: 'maluku',
    name: 'Kepulauan Maluku (Ternate & Tidore)',
    year: '1512 (Portugis) & 1521 (Spanyol)',
    lat: 0.8,
    lng: 127.3,
    x: 88,
    y: 56,
    description: 'Kepulauan Rempah Legendaris (The Spice Islands)! Pusat penghasil cengkih dan pala terbesar di dunia.',
    badge: 'Tujuan Utama'
  },
  {
    id: 'banten',
    name: 'Pelabuhan Banten (Jawa)',
    year: '1596 (Cornelis de Houtman)',
    lat: -6.0,
    lng: 106.1,
    x: 77,
    y: 63,
    description: 'Pendaratan pertama armada Belanda di Nusantara yang dipimpin Cornelis de Houtman, cikal bakal berdirinya VOC 1602.',
    badge: 'Awal Kolonial Belanda'
  },
  {
    id: 'banjar',
    name: 'Kesultanan Banjar (Kalimantan Selatan)',
    year: '1606 - 1859',
    lat: -3.3,
    lng: 114.6,
    x: 81,
    y: 59,
    description: 'Daerah penghasil lada dan tambang batu bara. Pusat Perang Banjar 1859 di bawah Pangeran Antasari melawan dominasi Belanda.',
    badge: 'Muatan Lokal Awayan'
  }
];
