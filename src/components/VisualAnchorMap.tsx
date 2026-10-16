import React, { useState } from 'react';
import { HISTORICAL_ROUTE_WAYPOINTS } from '../data/curriculumData';
import { 
  Anchor, 
  MapPin, 
  Info, 
  Sparkles, 
  Scale, 
  Ship, 
  Languages, 
  ShieldAlert,
  Flame
} from 'lucide-react';

interface VisualAnchorMapProps {
  stage: number;
}

export const VisualAnchorMap: React.FC<VisualAnchorMapProps> = ({ stage }) => {
  const [selectedWaypoint, setSelectedWaypoint] = useState(HISTORICAL_ROUTE_WAYPOINTS[0]);
  const [activeTabAnalog, setActiveTabAnalog] = useState<'visual' | 'analogy'>('visual');

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Widget Header */}
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Anchor className="w-4 h-4 text-amber-600" />
          <h4 className="font-bold text-slate-800 text-xs tracking-tight">
            Visual Anchor & Peta Interaktif
          </h4>
        </div>
        <div className="flex items-center gap-1 bg-slate-200/80 p-0.5 rounded-lg text-[10px]">
          <button
            onClick={() => setActiveTabAnalog('visual')}
            className={`px-2 py-0.5 rounded font-bold transition-all ${
              activeTabAnalog === 'visual' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
            }`}
          >
            Visualisasi
          </button>
          <button
            onClick={() => setActiveTabAnalog('analogy')}
            className={`px-2 py-0.5 rounded font-bold transition-all ${
              activeTabAnalog === 'analogy' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
            }`}
          >
            Analogi Konsep
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {activeTabAnalog === 'visual' ? (
          <div>
            {stage === 1 && (
              /* STAGE 1: Visual comparison of Spice vs Gold */
              <div className="space-y-3">
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-3.5 text-center relative">
                  <div className="flex justify-center items-center gap-4 text-3xl my-1">
                    <span title="Pala & Cengkih">🌶️</span>
                    <span className="text-sm font-black text-amber-700">LEBIH MAHAL DARI</span>
                    <span title="Emas Murni">👑 💰</span>
                  </div>
                  <h5 className="font-extrabold text-slate-900 text-xs mt-1">
                    Krisis Rempah di Eropa Pasca-1453
                  </h5>
                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                    Setelah <strong>Konstantinopel jatuh ke Kesultanan Utsmaniyah (1453)</strong>, jalur darat ditutup. Di Eropa saat musim dingin, ternak harus disembelih dan diawetkan menggunakan minyak atsiri cengkih & pala Maluku.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5">
                    <span className="text-[10px] font-bold text-amber-700 block mb-0.5">Musim Dingin Eropa:</span>
                    <p className="text-[11px] text-slate-600">Daging cepat busuk tanpa garam & rempah pengawet.</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5">
                    <span className="text-[10px] font-bold text-amber-700 block mb-0.5">Kepulauan Maluku:</span>
                    <p className="text-[11px] text-slate-600">Satu-satunya tempat di bumi tempat pala & cengkih tumbuh alami saat itu.</p>
                  </div>
                </div>
              </div>
            )}

            {stage === 2 && (
              /* STAGE 2: Interactive Maritime Route Map */
              <div className="space-y-3">
                <div className="relative w-full h-44 bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-inner">
                  {/* Stylized World Maritime Map SVG Canvas */}
                  <svg className="w-full h-full" viewBox="0 0 100 80">
                    <defs>
                      <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f59e0b" />
                        <stop offset="50%" stopColor="#f97316" />
                        <stop offset="100%" stopColor="#ef4444" />
                      </linearGradient>
                    </defs>

                    {/* Continents outlines stylized */}
                    <path
                      d="M 5,20 Q 15,10 25,25 Q 20,45 10,40 Z"
                      fill="#1e293b"
                      opacity="0.8"
                    />
                    <path
                      d="M 20,45 Q 35,50 30,75 Q 15,70 20,45 Z"
                      fill="#1e293b"
                      opacity="0.8"
                    />
                    <path
                      d="M 40,30 Q 60,30 55,50 Q 45,45 40,30 Z"
                      fill="#1e293b"
                      opacity="0.8"
                    />
                    <path
                      d="M 68,48 Q 95,45 92,68 Q 70,68 68,48 Z"
                      fill="#1e293b"
                      opacity="0.8"
                    />

                    {/* Maritime Route Curved Path */}
                    <path
                      d="M 12,35 Q 8,55 28,75 Q 40,75 52,45 Q 65,48 74,54 Q 80,55 88,56"
                      fill="none"
                      stroke="url(#routeGradient)"
                      strokeWidth="1.5"
                      strokeDasharray="2 1.5"
                      className="animate-pulse"
                    />

                    {/* Waypoint Markers */}
                    {HISTORICAL_ROUTE_WAYPOINTS.map((wp) => {
                      const isSelected = selectedWaypoint.id === wp.id;
                      return (
                        <g 
                          key={wp.id} 
                          onClick={() => setSelectedWaypoint(wp)}
                          className="cursor-pointer transition-transform hover:scale-125"
                        >
                          <circle
                            cx={wp.x}
                            cy={wp.y}
                            r={isSelected ? 3.5 : 2.5}
                            fill={isSelected ? '#f59e0b' : '#38bdf8'}
                            stroke="#ffffff"
                            strokeWidth="0.8"
                          />
                          {isSelected && (
                            <circle
                              cx={wp.x}
                              cy={wp.y}
                              r={6}
                              fill="none"
                              stroke="#f59e0b"
                              strokeWidth="0.5"
                              opacity="0.6"
                            />
                          )}
                        </g>
                      );
                    })}
                  </svg>

                  <div className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-xs text-[10px] text-amber-300 px-2 py-0.5 rounded border border-slate-700">
                    <Ship className="w-3 h-3 inline mr-1" /> Klik titik pin untuk melihat detail rute
                  </div>
                </div>

                {/* Selected Point Info Card */}
                <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                        {selectedWaypoint.badge}
                      </span>
                      <h5 className="font-extrabold text-slate-900 text-xs mt-1">
                        {selectedWaypoint.name}
                      </h5>
                    </div>
                    <span className="text-[10px] text-slate-500 font-bold bg-white px-2 py-0.5 rounded border border-slate-200">
                      {selectedWaypoint.year}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                    {selectedWaypoint.description}
                  </p>
                </div>
              </div>
            )}

            {stage === 3 && (
              /* STAGE 3: VOC Monopoly & Extirpation Diagram */
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="bg-rose-50 border border-rose-200 rounded-xl p-3">
                    <ShieldAlert className="w-5 h-5 text-rose-600 mx-auto mb-1" />
                    <h5 className="font-bold text-rose-950 text-xs">Sistem Monopoli VOC</h5>
                    <p className="text-[10px] text-rose-800 mt-1 leading-snug">
                      • Harga ditentukan sepihak sangat murah<br/>
                      • Petani dilarang jual ke pihak lain<br/>
                      • <strong>Pelayaran Hongi:</strong> Patroli kora-kora<br/>
                      • <strong>Ekstirpasi:</strong> Tebang pohon berlebih
                    </p>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3">
                    <Scale className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                    <h5 className="font-bold text-emerald-950 text-xs">Perdagangan Sehat</h5>
                    <p className="text-[10px] text-emerald-800 mt-1 leading-snug">
                      • Petani bebas memilih pembeli<br/>
                      • Terjadi persaingan harga wajar<br/>
                      • Pedagang Makassar, Jawa, & Inggris boleh bersaing jujur
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-[11px] text-slate-600">
                  <span className="font-bold text-slate-800 block mb-0.5">Dampak Tanam Paksa (Cultuurstelsel 1830):</span>
                  Gubernur Jenderal Van den Bosch mewajibkan 1/5 tanah rakyat ditanami kopi & tebu ekspor, memicu kelaparan parah di Pulau Jawa.
                </div>
              </div>
            )}

            {stage === 4 && (
              /* STAGE 4: Local Banjar Resistance & Loanwords */
              <div className="space-y-3">
                <div className="bg-amber-900 text-white rounded-xl p-3.5 shadow-xs">
                  <div className="flex items-center gap-2 mb-1">
                    <Flame className="w-4 h-4 text-amber-400" />
                    <h5 className="font-bold text-xs">Perang Banjar (1859 - 1905)</h5>
                  </div>
                  <p className="text-[11px] text-amber-100 leading-relaxed">
                    Dipimpin oleh <strong>Pangeran Antasari</strong> di Kalimantan Selatan, rakyat berjuang menolak monopoli tambang batu bara Pengaron dan campur tangan kolonial Belanda.
                  </p>
                  <div className="mt-2 text-[10px] font-black text-amber-300 italic">
                    "Haram Manyarah Waja Sampai Kaputing!"
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Languages className="w-4 h-4 text-amber-600" />
                    <span className="font-bold text-xs text-slate-800">Bukti Kontak Bahasa (Kata Serapan):</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                    <div className="bg-white p-1.5 rounded border border-slate-200">
                      <span className="font-semibold text-slate-500 block text-[10px]">Belanda:</span>
                      <strong>Kantor</strong> (Kantoor), <strong>Handuk</strong> (Handdoek), <strong>Kulkas</strong> (Koelkast)
                    </div>
                    <div className="bg-white p-1.5 rounded border border-slate-200">
                      <span className="font-semibold text-slate-500 block text-[10px]">Portugis:</span>
                      <strong>Jendela</strong> (Janela), <strong>Meja</strong> (Mesa), <strong>Lemari</strong> (Armario)
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* CONCEPT ANALOGY TAB */
          <div className="space-y-3">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-slate-800">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <h5 className="font-bold text-amber-950 text-xs">
                  {stage === 1 && "Analogi Botol Air di Tengah Gurun Pasir"}
                  {stage === 2 && "Analogi Membeli Langsung ke Petani"}
                  {stage === 3 && "Analogi Kantin Sekolah Monopoli"}
                  {stage === 4 && "Analogi Jejak Kaki pada Semen Basah"}
                </h5>
              </div>
              <p className="text-xs text-amber-900 leading-relaxed">
                {stage === 1 && "Di tengah padang pasir tanpa sumber air, sebotol air putih bernilai jauh lebih tinggi daripada sebongkah perhiasan karena air adalah penentu hidup dan mati. Begitulah rempah Maluku di tengah musim dingin Eropa yang membekukan ternak!"}
                {stage === 2 && "Jika kamu membeli mangga dari tengkulak kelima di kota, harganya membengkak 5 kali lipat. Alfonso de Albuquerque berlayar ribuan kilometer untuk memotong semua calo dan langsung mengambil rempah di sumber aslinya."}
                {stage === 3 && "Bayangkan sekolahmu melarang siapa pun membawa botol minum dan hanya 1 kantin yang boleh jualan. Kantin itu bebas memasang tarif Rp 20.000 untuk segelas air dan kamu tidak punya pilihan lain. Itulah Monopoli Perdagangan VOC!"}
                {stage === 4 && "Peristiwa ratusan tahun silam tidak hilang ditelan bumi, melainkan membekas seperti jejak di semen. Kata-kata yang kita ucapkan, tata kota, hingga nama jalan di Kalimantan Selatan adalah bukti hidup sejarah tersebut."}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
