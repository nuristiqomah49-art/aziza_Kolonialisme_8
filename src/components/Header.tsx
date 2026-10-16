import React from 'react';
import { 
  Compass, 
  Coins, 
  BookOpen, 
  Bot, 
  PenTool, 
  TrendingUp, 
  Users, 
  Home, 
  GraduationCap,
  Sparkles,
  UserCheck,
  UserPlus
} from 'lucide-react';
import { StudentUser } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userXP: number;
  xpAnimation: boolean;
  currentStudent: StudentUser;
  onOpenLoginModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  userXP,
  xpAnimation,
  currentStudent,
  onOpenLoginModal
}) => {
  const initialLetter = currentStudent.name ? currentStudent.name[0].toUpperCase() : 'S';

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo & School Branding */}
          <div 
            onClick={() => setActiveTab('dashboard')} 
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="bg-gradient-to-tr from-amber-600 to-amber-500 text-white p-2.5 rounded-xl shadow-md group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg text-slate-900 tracking-tight">NusantaraQuest</span>
                <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full border border-amber-200">
                  {currentStudent.classRoom || 'IPS Kelas 8'}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                <span>SMPN 4 Awayan</span>
                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                <span className="text-amber-700 font-semibold">Kurikulum Merdeka</span>
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex space-x-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'dashboard'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Home className="w-3.5 h-3.5" /> Beranda
            </button>
            <button
              onClick={() => setActiveTab('materials')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'materials'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" /> Pilih Materi
            </button>
            <button
              onClick={() => setActiveTab('tutor')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 relative ${
                activeTab === 'tutor'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Bot className="w-3.5 h-3.5 text-amber-700" /> AI Tutor
              <span className="bg-amber-700 text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded-full">
                Socratic RAG
              </span>
            </button>
            <button
              onClick={() => setActiveTab('practice')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'practice'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <PenTool className="w-3.5 h-3.5" /> Latihan HOTS
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'progress'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" /> Progres
            </button>
            <button
              onClick={() => setActiveTab('teacher')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'teacher'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Users className="w-3.5 h-3.5" /> Portal Guru
            </button>
          </nav>

          {/* User Profile & XP Badge */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* XP counter */}
            <div className={`flex items-center bg-amber-50 border border-amber-200 px-2.5 sm:px-3 py-1.5 rounded-full transition-transform ${
              xpAnimation ? 'scale-110 bg-amber-200 border-amber-400' : ''
            }`}>
              <Coins className="w-4 h-4 text-amber-500 mr-1.5 fill-amber-400 animate-bounce" />
              <span className="text-xs font-extrabold text-amber-900">{userXP} XP</span>
              {xpAnimation && (
                <span className="ml-1 text-[10px] font-bold text-amber-700 animate-pulse flex items-center">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                </span>
              )}
            </div>

            {/* Logged in student button / switcher */}
            <button
              onClick={onOpenLoginModal}
              title="Klik untuk Ganti Siswa atau Masuk dengan Nama Lain"
              className="flex items-center gap-2 pl-2 border-l border-slate-200 hover:opacity-80 transition-opacity text-left group"
            >
              <div className="w-9 h-9 rounded-full bg-amber-100 border-2 border-amber-500 flex items-center justify-center font-black text-xs text-amber-900 shadow-xs group-hover:bg-amber-200 transition-colors">
                {initialLetter}
              </div>
              <div className="hidden lg:block">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-slate-800 block leading-tight group-hover:text-amber-800 transition-colors">
                    {currentStudent.name}
                  </span>
                  <UserCheck className="w-3 h-3 text-amber-600" />
                </div>
                <span className="text-[10px] text-slate-500 font-medium block">
                  {currentStudent.classRoom} • Ganti Akun
                </span>
              </div>
            </button>

            {/* Mobile quick switch button */}
            <button
              onClick={onOpenLoginModal}
              className="lg:hidden p-1.5 text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100"
              title="Ganti Siswa"
            >
              <UserPlus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Scrollable Navigation Menu */}
      <div className="md:hidden border-t border-slate-200 bg-slate-50/90 px-2 py-1.5 flex justify-between overflow-x-auto text-[11px] font-semibold">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-lg whitespace-nowrap ${
            activeTab === 'dashboard' ? 'text-amber-800 bg-amber-100 font-bold' : 'text-slate-600'
          }`}
        >
          <Home className="w-4 h-4 mb-0.5" /> Beranda
        </button>
        <button
          onClick={() => setActiveTab('materials')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-lg whitespace-nowrap ${
            activeTab === 'materials' ? 'text-amber-800 bg-amber-100 font-bold' : 'text-slate-600'
          }`}
        >
          <BookOpen className="w-4 h-4 mb-0.5" /> Materi
        </button>
        <button
          onClick={() => setActiveTab('tutor')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-lg whitespace-nowrap ${
            activeTab === 'tutor' ? 'text-amber-800 bg-amber-100 font-bold' : 'text-slate-600'
          }`}
        >
          <Bot className="w-4 h-4 mb-0.5" /> AI Tutor
        </button>
        <button
          onClick={() => setActiveTab('practice')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-lg whitespace-nowrap ${
            activeTab === 'practice' ? 'text-amber-800 bg-amber-100 font-bold' : 'text-slate-600'
          }`}
        >
          <PenTool className="w-4 h-4 mb-0.5" /> Latihan
        </button>
        <button
          onClick={() => setActiveTab('progress')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-lg whitespace-nowrap ${
            activeTab === 'progress' ? 'text-amber-800 bg-amber-100 font-bold' : 'text-slate-600'
          }`}
        >
          <TrendingUp className="w-4 h-4 mb-0.5" /> Progres
        </button>
        <button
          onClick={() => setActiveTab('teacher')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-lg whitespace-nowrap ${
            activeTab === 'teacher' ? 'text-amber-800 bg-amber-100 font-bold' : 'text-slate-600'
          }`}
        >
          <GraduationCap className="w-4 h-4 mb-0.5" /> Guru
        </button>
      </div>
    </header>
  );
};
