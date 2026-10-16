import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { MaterialsView } from './components/MaterialsView';
import { TutorView } from './components/TutorView';
import { PracticeView } from './components/PracticeView';
import { ProgressView } from './components/ProgressView';
import { TeacherView } from './components/TeacherView';
import { SourceViewerModal } from './components/SourceViewerModal';
import { StudentLoginModal } from './components/StudentLoginModal';
import { RAGSource, StudentUser, StudentRecord } from './types';
import { ALL_RAG_SOURCES, INITIAL_STUDENTS } from './data/curriculumData';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [currentStage, setCurrentStage] = useState<number>(1);
  const [userXP, setUserXP] = useState<number>(450);
  const [xpAnimation, setXpAnimation] = useState<boolean>(false);
  const [viewingSource, setViewingSource] = useState<RAGSource | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  // Student State
  const [currentStudent, setCurrentStudent] = useState<StudentUser>(() => {
    try {
      const saved = localStorage.getItem('nusantaraquest_active_student');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read student from localStorage', e);
    }
    return {
      id: 'std-1',
      name: 'Ahmad',
      classRoom: 'Kelas 8B',
      xp: 450,
      currentStage: 1,
    };
  });

  // All Students list (including new logins)
  const [allStudents, setAllStudents] = useState<StudentRecord[]>(() => {
    try {
      const savedList = localStorage.getItem('nusantaraquest_student_roster');
      if (savedList) return JSON.parse(savedList);
    } catch (e) {
      console.warn('Could not read student roster from localStorage', e);
    }
    return INITIAL_STUDENTS;
  });

  // Sync XP and currentStage with currentStudent
  useEffect(() => {
    if (currentStudent) {
      setUserXP(currentStudent.xp || 450);
      setCurrentStage(currentStudent.currentStage || 1);
    }
  }, [currentStudent.id]);

  // Handle Login / Switch Student
  const handleStudentLogin = (student: StudentUser) => {
    setCurrentStudent(student);
    setUserXP(student.xp);
    setCurrentStage(student.currentStage);

    try {
      localStorage.setItem('nusantaraquest_active_student', JSON.stringify(student));
    } catch (e) {
      console.warn('Could not save student to localStorage', e);
    }

    // Check if student is already in teacher roster
    setAllStudents(prev => {
      const exists = prev.some(s => s.name.toLowerCase() === student.name.toLowerCase());
      let updatedList = prev;
      if (!exists) {
        const newRecord: StudentRecord = {
          id: student.id,
          name: student.name,
          classRoom: student.classRoom,
          currentStage: student.currentStage,
          xp: student.xp,
          monopolyMastery: 'Mulai Berkembang',
          chronologyMastery: 'Mulai Berkembang',
          criticalThinking: 'Mulai Berkembang',
          hintsUsed: 0,
          lastActive: 'Baru saja masuk',
          badgesCount: 1,
        };
        updatedList = [newRecord, ...prev];
      } else {
        // Update existing student's last active
        updatedList = prev.map(s => 
          s.name.toLowerCase() === student.name.toLowerCase()
            ? { ...s, lastActive: 'Baru saja aktif', classRoom: student.classRoom }
            : s
        );
      }
      try {
        localStorage.setItem('nusantaraquest_student_roster', JSON.stringify(updatedList));
      } catch (e) {
        console.warn('Could not save roster to localStorage', e);
      }
      return updatedList;
    });
  };

  const handleAddXP = (amount: number) => {
    setUserXP(prev => {
      const newXP = prev + amount;
      const updatedStudent = { ...currentStudent, xp: newXP };
      setCurrentStudent(updatedStudent);
      try {
        localStorage.setItem('nusantaraquest_active_student', JSON.stringify(updatedStudent));
      } catch (e) {}

      // Update student in allStudents roster
      setAllStudents(prevRoster => {
        const updatedRoster = prevRoster.map(s => 
          s.id === currentStudent.id || s.name.toLowerCase() === currentStudent.name.toLowerCase()
            ? { ...s, xp: newXP }
            : s
        );
        try {
          localStorage.setItem('nusantaraquest_student_roster', JSON.stringify(updatedRoster));
        } catch (e) {}
        return updatedRoster;
      });

      return newXP;
    });

    setXpAnimation(true);
    setTimeout(() => setXpAnimation(false), 2000);
  };

  const handleStartStage = (stageNum: number) => {
    setCurrentStage(stageNum);
    const updatedStudent = { ...currentStudent, currentStage: stageNum };
    setCurrentStudent(updatedStudent);
    try {
      localStorage.setItem('nusantaraquest_active_student', JSON.stringify(updatedStudent));
    } catch (e) {}
    setActiveTab('tutor');
  };

  const handleSelectTopic = (stageNum: number) => {
    setCurrentStage(stageNum);
    setActiveTab('tutor');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased font-sans">
      {/* Top Application Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userXP={userXP}
        xpAnimation={xpAnimation}
        currentStudent={currentStudent}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === 'dashboard' && (
          <DashboardView
            onStartStage={handleStartStage}
            onNavigate={setActiveTab}
            currentStage={currentStage}
            userXP={userXP}
            studentName={currentStudent.name}
            studentClass={currentStudent.classRoom}
            onOpenLoginModal={() => setIsLoginModalOpen(true)}
          />
        )}

        {activeTab === 'materials' && (
          <MaterialsView
            onSelectTopic={handleSelectTopic}
            onOpenSourceModal={(src) => setViewingSource(src)}
          />
        )}

        {activeTab === 'tutor' && (
          <TutorView
            currentStage={currentStage}
            onSelectStage={(stageNum) => setCurrentStage(stageNum)}
            onAddXP={handleAddXP}
            onOpenSourceModal={(src) => setViewingSource(src)}
            studentName={currentStudent.name}
            studentClass={currentStudent.classRoom}
          />
        )}

        {activeTab === 'practice' && (
          <PracticeView onAddXP={handleAddXP} />
        )}

        {activeTab === 'progress' && (
          <ProgressView
            currentStage={currentStage}
            userXP={userXP}
            onNavigate={setActiveTab}
            studentName={currentStudent.name}
          />
        )}

        {activeTab === 'teacher' && (
          <TeacherView studentsList={allStudents} />
        )}
      </main>

      {/* RAG Full Document Modal */}
      <SourceViewerModal
        source={viewingSource}
        onClose={() => setViewingSource(null)}
      />

      {/* Student Login / Account Switcher Modal */}
      <StudentLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        currentStudent={currentStudent}
        onLogin={handleStudentLogin}
      />

      {/* Footer Branding */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="font-medium">
            <strong>NusantaraQuest</strong> • Media Belajar IPS SMPN 4 Awayan (Kabupaten Balangan, Kalimantan Selatan)
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="text-amber-700 hover:text-amber-800 font-bold hover:underline"
            >
              Ganti Akun Siswa ({currentStudent.name} - {currentStudent.classRoom})
            </button>
            <span className="text-slate-300">•</span>
            <span className="text-slate-400">Kurikulum Merdeka</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
