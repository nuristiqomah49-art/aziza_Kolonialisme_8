import React from 'react';
import { 
  Ship, 
  Anchor, 
  Coins, 
  ArrowRight, 
  BookOpen, 
  Compass, 
  MapPin, 
  CheckCircle,
  FileText
} from 'lucide-react';
import { ALL_RAG_SOURCES } from '../data/curriculumData';

interface MaterialsViewProps {
  onSelectTopic: (stageNum: number) => void;
  onOpenSourceModal: (source: any) => void;
}

export const MaterialsView: React.FC<MaterialsViewProps> = ({ 
  onSelectTopic,
  onOpenSourceModal
}) => {
  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
            Modul Pembelajaran Penjelajahan Samudra & Kolonialisme
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Materi resmi IPS Kelas 8 Kurikulum Merdeka (Kemendikbudristek) untuk SMPN 4 Awayan
          </p>
        </div>
        <button
          onClick={() => onOpenSourceModal(ALL_RAG_SOURCES[0])}
          className="bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold px-3.5 py-2 rounded-xl transition-all border border-amber-300 flex items-center gap-1.5 shadow-2xs"
        >
          <FileText className="w-4 h-4 text-amber-700" /> Buka Buku Teks Siswa
        </button>
      </div>

      {/* Main Topic Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Module 1 */}
        <div className="bg-white rounded-2xl border-2 border-amber-500 shadow-md p-6 relative flex flex-col justify-between hover:shadow-lg transition-shadow">
          <div className="absolute -top-3 right-5 bg-amber-500 text-slate-950 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
            Rekomendasi Utama
          </div>

          <div>
            <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center text-xl font-bold mb-4">
              <Ship className="w-6 h-6 text-amber-700" />
            </div>
            <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">
              Bab 1 • Bagian A
            </span>
            <h3 className="text-base font-extrabold text-slate-900 mt-1">
              Latar Belakang Kedatangan Bangsa Barat
            </h3>
            <p className="text-slate-600 text-xs mt-2 leading-relaxed">
              Daya tarik rempah-rempah (Gold), kejayaan negara maritim (Glory), dan penyebaran agama (Gospel). Mengapa jatuhnya kota Konstantinopel (1453) memicu penjelajahan samudra terbesar dalam sejarah manusia?
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              <span className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-1 rounded-md">
                Jalur Rempah
              </span>
              <span className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-1 rounded-md">
                3G Concept
              </span>
              <span className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-1 rounded-md">
                Konstantinopel 1453
              </span>
            </div>
          </div>

          <button
            onClick={() => onSelectTopic(1)}
            className="mt-6 w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm"
          >
            Mulai Belajar Topik Ini <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Module 2 */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-amber-400 p-6 flex flex-col justify-between hover:shadow-md transition-all">
          <div>
            <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center text-xl font-bold mb-4">
              <Anchor className="w-6 h-6 text-amber-700" />
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Bab 1 • Bagian B
            </span>
            <h3 className="text-base font-extrabold text-slate-900 mt-1">
              Kedatangan Bangsa Eropa di Nusantara
            </h3>
            <p className="text-slate-600 text-xs mt-2 leading-relaxed">
              Kronologi ekspedisi maritim Portugis (1511 Melaka), Spanyol (1521 Maluku & Perjanjian Saragosa), hingga pendaratan Belanda di Banten (1596) oleh Cornelis de Houtman.
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              <span className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-1 rounded-md">
                Alfonso de Albuquerque
              </span>
              <span className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-1 rounded-md">
                Banten 1596
              </span>
              <span className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-1 rounded-md">
                Maluku 1512
              </span>
            </div>
          </div>

          <button
            onClick={() => onSelectTopic(2)}
            className="mt-6 w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5"
          >
            Pilih Topik Ini <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Module 3 */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-amber-400 p-6 flex flex-col justify-between hover:shadow-md transition-all">
          <div>
            <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center text-xl font-bold mb-4">
              <Coins className="w-6 h-6 text-amber-700" />
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Bab 1 • Bagian C & D
            </span>
            <h3 className="text-base font-extrabold text-slate-900 mt-1">
              Monopoli VOC, Tanam Paksa & Muatan Banjar
            </h3>
            <p className="text-slate-600 text-xs mt-2 leading-relaxed">
              Memahami Hak Octrooi VOC, Pelayaran Hongi, sistem Tanam Paksa (Cultuurstelsel), hingga perlawanan Pangeran Antasari dalam Perang Banjar (Kalimantan Selatan).
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              <span className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-1 rounded-md">
                Monopoli Dagang
              </span>
              <span className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-1 rounded-md">
                Cultuurstelsel
              </span>
              <span className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-1 rounded-md">
                Perang Banjar
              </span>
            </div>
          </div>

          <button
            onClick={() => onSelectTopic(3)}
            className="mt-6 w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5"
          >
            Pilih Topik Ini <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* RAG Curated Document Sources Banner */}
      <div className="bg-slate-100 rounded-2xl p-5 border border-slate-200">
        <h4 className="font-extrabold text-slate-800 text-xs sm:text-sm mb-2 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-amber-700" /> Dokumen Rujukan RAG yang Diintegrasikan:
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {ALL_RAG_SOURCES.map((source) => (
            <div
              key={source.id}
              onClick={() => onOpenSourceModal(source)}
              className="bg-white p-3 rounded-xl border border-slate-200 hover:border-amber-400 hover:shadow-xs transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded">
                  {source.badge}
                </span>
                <span className="text-[10px] text-slate-400 font-semibold">{source.pageRef}</span>
              </div>
              <h5 className="font-bold text-slate-800 text-xs line-clamp-1">{source.title}</h5>
              <p className="text-[10px] text-slate-500 mt-1 line-clamp-2">{source.excerpt}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
