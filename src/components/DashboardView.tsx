import React from 'react';
import { STORY_STAGES } from '../data/curriculumData';
import { 
  Play, 
  Map, 
  Award, 
  Brain, 
  Flame, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Compass,
  Sparkles
} from 'lucide-react';

interface DashboardViewProps {
  onStartStage: (stageNum: number) => void;
  onNavigate: (tab: string) => void;
  currentStage: number;
  userXP: number;
  studentName: string;
  studentClass: string;
  onOpenLoginModal: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onStartStage,
  onNavigate,
  currentStage,
  userXP,
  studentName,
  studentClass,
  onOpenLoginModal
}) => {
  return (
    <div className="space-y-6">
      {/* Hero Welcome Banner */}
      <div className="bg-gradient-to-r from-amber-800 via-amber-700 to-amber-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none flex items-center justify-center">
          <Compass className="w-56 h-56 text-white" />
        </div>

        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 bg-amber-500/30 text-amber-200 text-xs font-semibold px-3 py-1 rounded-full border border-amber-400/30">
              <Compass className="w-3.5 h-3.5 text-amber-300" /> Petualangan Jalur Rempah Nusantara
            </span>
            <button
              onClick={onOpenLoginModal}
              className="text-[11px] text-amber-300 hover:text-white underline font-semibold"
            >
              Bukan {studentName}? Ganti Siswa
            </button>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            Selamat Datang di NusantaraQuest, {studentName}! 👋
          </h1>
          <p className="text-amber-100 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
            Halo {studentName} ({studentClass}), hari ini kita menelusuri bagaimana harumnya rempah Nusantara (pala & cengkih) menggerakkan kapal-kapal bangsa Portugis, Spanyol, dan Belanda menyeberangi samudra luas hingga sampai di Maluku dan Tanah Banjar!
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onStartStage(currentStage)}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-slate-950" /> Lanjutkan Misi: Tahap {currentStage}
            </button>
            <button
              onClick={() => onNavigate('materials')}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-all border border-white/20 flex items-center gap-2"
            >
              <Map className="w-4 h-4" /> Lihat Peta Materi
            </button>
          </div>
        </div>
      </div>

      {/* 4-Stage Story Flow Overview */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Alur Belajar Berbasis Cerita (4 Tahapan Terstruktur)
            </h2>
            <p className="text-xs text-slate-500">
              Metode bimbingan Socratic ramah siswa SMPN 4 Awayan berbasis Kurikulum Merdeka
            </p>
          </div>
          <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full hidden sm:inline-block">
            Tahap Aktif: {currentStage} / 4
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((stageNum) => {
            const stage = STORY_STAGES[stageNum];
            const isActive = currentStage === stageNum;
            const isCompleted = currentStage > stageNum;
            const isLocked = currentStage < stageNum;

            return (
              <div
                key={stageNum}
                onClick={() => onStartStage(stageNum)}
                className={`rounded-2xl p-4 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                  isActive
                    ? 'bg-white border-2 border-amber-500 shadow-md ring-2 ring-amber-500/20'
                    : isCompleted
                    ? 'bg-white border border-emerald-300 shadow-xs hover:border-emerald-500'
                    : 'bg-slate-50 border border-slate-200 opacity-80 hover:opacity-100 hover:bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`w-7 h-7 rounded-full font-bold flex items-center justify-center text-xs ${
                        isActive
                          ? 'bg-amber-500 text-slate-950 font-black'
                          : isCompleted
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {stageNum}
                    </span>
                    {isActive ? (
                      <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-600" /> Sedang Aktif
                      </span>
                    ) : isCompleted ? (
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Selesai
                      </span>
                    ) : (
                      <span className="bg-slate-200 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Terbuka
                      </span>
                    )}
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm line-clamp-1">
                    {stage.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {stage.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400">
                  <span className="flex items-center gap-1 text-[11px]">
                    <Clock className="w-3 h-3" /> {stage.duration}
                  </span>
                  <span className="text-amber-700 font-bold flex items-center gap-1 text-[11px] hover:translate-x-0.5 transition-transform">
                    Buka <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Metrics & Badges Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Lencana Diraih */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 shadow-inner">
            <Award className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">
              Lencana Diraih
            </span>
            <h4 className="font-extrabold text-slate-900 text-sm">Penjelajah Pemula</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Selesaikan Tahap 2 untuk membuka lencana "Ahli Jalur Rempah"
            </p>
          </div>
        </div>

        {/* Pemahaman Konsep HOTS */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 shadow-inner">
            <Brain className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
              Pemahaman Konsep
            </span>
            <h4 className="font-extrabold text-slate-900 text-sm">3 dari 5 Konsep Terkuasai</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Paham Monopoli, 3G, dan Jatuhnya Konstantinopel
            </p>
          </div>
        </div>

        {/* Streak Keaktifan */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 shadow-inner">
            <Flame className="w-6 h-6 text-orange-600 fill-orange-500" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-orange-700 uppercase tracking-wider block">
              Keaktifan Belajar
            </span>
            <h4 className="font-extrabold text-slate-900 text-sm">3 Hari Beruntun!</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Konsistensi belajar sangat bagus di SMPN 4 Awayan
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
