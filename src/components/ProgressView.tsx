import React from 'react';
import { 
  TrendingUp, 
  CheckCircle2, 
  Award, 
  Compass, 
  Anchor, 
  Scroll, 
  Star, 
  Sparkles, 
  ArrowRight,
  Clock,
  BookOpen
} from 'lucide-react';

interface ProgressViewProps {
  currentStage: number;
  userXP: number;
  onNavigate: (tab: string) => void;
  studentName: string;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  currentStage,
  userXP,
  onNavigate,
  studentName
}) => {
  const badges = [
    {
      id: 'b1',
      title: 'Penjelajah Pemula',
      desc: 'Memulai Misi Jalur Rempah',
      emoji: '🧭',
      unlocked: true,
      condition: 'Mulai petualangan tahap 1'
    },
    {
      id: 'b2',
      title: 'Peta & Navigasi Maritim',
      desc: 'Kuasai rute Alfonso 1511',
      emoji: '⚓',
      unlocked: currentStage >= 2,
      condition: 'Selesaikan Tahap 2'
    },
    {
      id: 'b3',
      title: 'Analis Monopoli VOC',
      desc: 'Paham sistem pasar & Hak Octrooi',
      emoji: '📜',
      unlocked: currentStage >= 3,
      condition: 'Selesaikan Tahap 3'
    },
    {
      id: 'b4',
      title: 'Pahlawan Banjar & Nusantara',
      desc: 'Paham korelasi lokal Antasari',
      emoji: '🏰',
      unlocked: currentStage >= 4,
      condition: 'Selesaikan Tahap 4'
    },
    {
      id: 'b5',
      title: 'Pemikir Kritis HOTS',
      desc: 'Meraih skor XP di atas 600 XP',
      emoji: '🌟',
      unlocked: userXP >= 600,
      condition: 'Kumpulkan minimal 600 XP'
    }
  ];

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-600" /> Progres & Rekap Capaian Belajar {studentName}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Evaluasi capaian indikator kognitif IPS Kelas 8 Kurikulum Merdeka - SMPN 4 Awayan
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full border border-amber-200">
            Total Capaian: {userXP} XP
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Rubrik Evaluasi Indikator Kognitif IPS */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-5">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h3 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Rubrik Evaluasi Indikator Kognitif
            </h3>
            <span className="text-[10px] text-slate-400 font-semibold">Skala 1 - 3 (Kemendikbud)</span>
          </div>

          <div className="space-y-4">
            {/* Indikator 1 */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-800">1. Konsep Monopoli & Kebijakan Kolonial</span>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Mahir (Skor 3)
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Mampu memberikan analogi konkret (kantin sekolah) dan menganalisis dampak monopoli terhadap kemiskinan petani Maluku.
              </p>
              <div className="w-full bg-slate-100 h-2.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-emerald-500 h-full w-full rounded-full transition-all"></div>
              </div>
            </div>

            {/* Indikator 2 */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-800">2. Kronologi Ekspedisi Maritim Bangsa Barat</span>
                <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {currentStage >= 2 ? 'Mahir (Skor 3)' : 'Mulai Berkembang (Skor 2)'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Mengenal urutan kedatangan Portugis (1511), Spanyol (1521), dan Belanda (1596) serta rute pelayaran mengitari Afrika.
              </p>
              <div className="w-full bg-slate-100 h-2.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all ${
                    currentStage >= 2 ? 'bg-emerald-500 w-full' : 'bg-amber-500 w-2/3'
                  }`}
                ></div>
              </div>
            </div>

            {/* Indikator 3 */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-800">3. Keaktifan Dialog Socratic & Nalar Mandiri</span>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Mahir (Skor 3)
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Secara mandiri merespon petunjuk bertahap (scaffolding hints) tanpa mencari jawaban instan.
              </p>
              <div className="w-full bg-slate-100 h-2.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-emerald-500 h-full w-full rounded-full transition-all"></div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-slate-600 text-[11px]">
            <strong>Catatan Guru Pembimbing:</strong> {studentName} menunjukkan keingintahuan tinggi saat menghubungkan sejarah rempah dengan situasi ekonomi dan kearifan lokal Banjar. Pertahankan!
          </div>
        </div>

        {/* Badges & Achievements Collection */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h3 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" /> Koleksi Lencana Belajar
            </h3>
            <span className="text-[10px] text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded">
              {badges.filter(b => b.unlocked).length} / {badges.length} Terbuka
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {badges.map((b) => (
              <div
                key={b.id}
                className={`p-3.5 rounded-xl border flex items-center space-x-3 transition-all ${
                  b.unlocked
                    ? 'bg-amber-50/70 border-amber-200 shadow-2xs'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <span className="text-2xl">{b.emoji}</span>
                <div>
                  <h5 className="font-bold text-xs text-slate-900">{b.title}</h5>
                  <p className="text-[10px] text-slate-500 mt-0.5">{b.desc}</p>
                  <span className={`text-[9px] font-bold block mt-1 ${
                    b.unlocked ? 'text-amber-800' : 'text-slate-400'
                  }`}>
                    {b.unlocked ? '✓ Diraih' : `Syarat: ${b.condition}`}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => onNavigate('tutor')}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm"
            >
              Lanjutkan Misi untuk Membuka Lencana Lainnya <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
