import React, { useState } from 'react';
import { StudentUser } from '../types';
import { INITIAL_STUDENTS } from '../data/curriculumData';
import { 
  UserCheck, 
  LogIn, 
  GraduationCap, 
  X, 
  Sparkles, 
  Compass, 
  ArrowRight,
  School
} from 'lucide-react';

interface StudentLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStudent: StudentUser | null;
  onLogin: (student: StudentUser) => void;
}

export const StudentLoginModal: React.FC<StudentLoginModalProps> = ({
  isOpen,
  onClose,
  currentStudent,
  onLogin
}) => {
  const [name, setName] = useState('');
  const [classRoom, setClassRoom] = useState('Kelas 8B');
  const [customClass, setCustomClass] = useState('');
  const [useCustomClass, setUseCustomClass] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = name.trim();
    const finalClass = useCustomClass ? customClass.trim() : classRoom.trim();

    if (!finalName) {
      setErrorMsg('Silakan masukkan nama lengkap siswa.');
      return;
    }
    if (!finalClass) {
      setErrorMsg('Silakan pilih atau ketik kelas.');
      return;
    }

    // Check if student exists in initial records or local storage
    const existing = INITIAL_STUDENTS.find(
      s => s.name.toLowerCase() === finalName.toLowerCase()
    );

    const loggedStudent: StudentUser = {
      id: existing ? existing.id : `std-${Date.now()}`,
      name: finalName,
      classRoom: finalClass,
      xp: existing ? existing.xp : 100,
      currentStage: existing ? existing.currentStage : 1,
    };

    onLogin(loggedStudent);
    onClose();
  };

  const handleQuickSelect = (std: typeof INITIAL_STUDENTS[0]) => {
    const loggedStudent: StudentUser = {
      id: std.id,
      name: std.name,
      classRoom: std.classRoom,
      xp: std.xp,
      currentStage: std.currentStage,
    };
    onLogin(loggedStudent);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 p-6 text-white relative">
          {currentStudent && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-xs rounded-xl flex items-center justify-center text-white">
              <Compass className="w-6 h-6 text-amber-200" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-amber-200 bg-amber-900/40 px-2 py-0.5 rounded-full border border-amber-400/30">
                SMPN 4 Awayan
              </span>
              <h3 className="font-black text-lg text-white">Masuk sebagai Siswa</h3>
            </div>
          </div>
          <p className="text-xs text-amber-100 leading-relaxed">
            Masukkan namamu dan kelas untuk memulai petualangan Jalur Rempah bersama AI Tutor!
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5">
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl font-medium">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nama Lengkap Siswa:
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrorMsg('');
                }}
                placeholder="Contoh: Siti Nurhaliza, Budi, dll."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all font-medium"
                autoFocus
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-bold text-slate-700">
                  Pilih / Masukkan Kelas:
                </label>
                <button
                  type="button"
                  onClick={() => setUseCustomClass(!useCustomClass)}
                  className="text-[11px] text-amber-700 hover:underline font-semibold"
                >
                  {useCustomClass ? 'Pilih dari daftar' : 'Ketik kelas lain'}
                </button>
              </div>

              {!useCustomClass ? (
                <select
                  value={classRoom}
                  onChange={(e) => setClassRoom(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all font-medium"
                >
                  <option value="Kelas 8A">Kelas 8A</option>
                  <option value="Kelas 8B">Kelas 8B (Utama)</option>
                  <option value="Kelas 8C">Kelas 8C</option>
                  <option value="Kelas 8D">Kelas 8D</option>
                  <option value="Kelas 7A">Kelas 7A</option>
                  <option value="Kelas 7B">Kelas 7B</option>
                  <option value="Kelas 9A">Kelas 9A</option>
                  <option value="Kelas 9B">Kelas 9B</option>
                </select>
              ) : (
                <input
                  type="text"
                  value={customClass}
                  onChange={(e) => setCustomClass(e.target.value)}
                  placeholder="Ketik nama kelasmu (contoh: Kelas 8C)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all font-medium"
                  required
                />
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-extrabold py-3 rounded-xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-amber-600/20"
            >
              <LogIn className="w-4 h-4" /> Masuk ke NusantaraQuest
            </button>
          </form>

          {/* Quick Select from Existing Registered Students */}
          <div className="pt-3 border-t border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 block mb-2">
              Atau Pilih Profil Siswa Cepat:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {INITIAL_STUDENTS.map((std) => (
                <button
                  key={std.id}
                  type="button"
                  onClick={() => handleQuickSelect(std)}
                  className={`text-xs px-2.5 py-1.5 rounded-lg border text-left transition-all flex items-center gap-1.5 ${
                    currentStudent?.name === std.name
                      ? 'bg-amber-100 text-amber-900 border-amber-400 font-bold'
                      : 'bg-slate-50 hover:bg-amber-50 text-slate-700 border-slate-200'
                  }`}
                >
                  <div className="w-5 h-5 rounded-full bg-amber-200 text-amber-800 font-bold flex items-center justify-center text-[10px]">
                    {std.name[0]}
                  </div>
                  <span>{std.name}</span>
                  <span className="text-[10px] text-slate-400">({std.classRoom})</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
