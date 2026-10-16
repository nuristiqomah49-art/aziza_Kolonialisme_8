import React, { useState } from 'react';
import { INITIAL_STUDENTS } from '../data/curriculumData';
import { StudentRecord } from '../types';
import { 
  Users, 
  Download, 
  Search, 
  ThumbsUp, 
  MessageSquare, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp, 
  FileSpreadsheet,
  Send,
  X
} from 'lucide-react';

interface TeacherViewProps {
  studentsList?: StudentRecord[];
}

export const TeacherView: React.FC<TeacherViewProps> = ({ studentsList }) => {
  const [students, setStudents] = useState<StudentRecord[]>(studentsList || INITIAL_STUDENTS);

  // Sync if studentsList changes
  React.useEffect(() => {
    if (studentsList) {
      setStudents(studentsList);
    }
  }, [studentsList]);

  const [searchQuery, setSearchQuery] = useState('');
  const [feedbackStudent, setFeedbackStudent] = useState<StudentRecord | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [alertSuccess, setAlertSuccess] = useState<string | null>(null);

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.classRoom.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGiveKudos = (studentName: string) => {
    setAlertSuccess(`Apresiasi bintang & pujian motivasi berhasil dikirim ke siswa ${studentName}! ⭐`);
    setTimeout(() => setAlertSuccess(null), 3500);
  };

  const handleSendCustomHint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackStudent || !feedbackMessage.trim()) return;

    setAlertSuccess(`Petunjuk bimbingan khusus berhasil dikirimkan ke ruang tutor ${feedbackStudent.name}! 📝`);
    setFeedbackStudent(null);
    setFeedbackMessage('');
    setTimeout(() => setAlertSuccess(null), 3500);
  };

  const handleDownloadReport = () => {
    // Generate CSV data for report
    const headers = 'ID,Nama,Kelas,Tahap,XP,Monopoli,Kronologi,Nalar_Kritis,Petunjuk_Digunakan\n';
    const rows = students.map(s => 
      `${s.id},"${s.name}",${s.classRoom},Tahap ${s.currentStage},${s.xp},${s.monopolyMastery},${s.chronologyMastery},${s.criticalThinking},${s.hintsUsed}`
    ).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Rekap_IPS_Kelas8B_SMPN4_Awayan.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setAlertSuccess('Laporan rekap capaian belajar kelas 8B berhasil diunduh dalam format CSV!');
    setTimeout(() => setAlertSuccess(null), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Teacher Portal Banner */}
      <div className="bg-amber-900 rounded-2xl p-6 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-md">
        <div>
          <span className="bg-amber-500 text-slate-950 text-xs font-black px-2.5 py-0.5 rounded-full inline-block mb-1">
            Portal Guru IPS
          </span>
          <h2 className="text-xl font-extrabold mt-1 tracking-tight">
            Dashboard Pemantauan Kelas 8B - SMPN 4 Awayan
          </h2>
          <p className="text-amber-200 text-xs mt-1">
            Ringkasan ketercapaian nalar siswa tanpa pengawasan yang kaku • Kurikulum Merdeka
          </p>
        </div>
        <button
          onClick={handleDownloadReport}
          className="bg-white hover:bg-amber-100 text-slate-900 font-bold px-4 py-2.5 rounded-xl text-xs transition-all flex items-center gap-2 shadow-xs shrink-0"
        >
          <Download className="w-4 h-4" /> Unduh Rekap Belajar (.CSV)
        </button>
      </div>

      {alertSuccess && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-3 rounded-xl text-xs font-bold flex items-center justify-between animate-fade-in">
          <span>{alertSuccess}</span>
          <button onClick={() => setAlertSuccess(null)} className="text-emerald-700">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
            Siswa Aktif Belajar
          </span>
          <h3 className="text-2xl font-black text-slate-800 mt-1">28 / 30 Siswa</h3>
          <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" /> 93% Tingkat Keaktifan Kelas
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
            Miskonsepsi Tersulit
          </span>
          <h3 className="text-base font-black text-slate-800 mt-1">Monopoli VOC & Devide et Impera</h3>
          <p className="text-xs text-amber-700 mt-1 font-medium">
            Siswa terbantu oleh analogi "Kantin Sekolah"
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
            Kemandirian Nalar Socratic
          </span>
          <h3 className="text-2xl font-black text-slate-800 mt-1">84%</h3>
          <p className="text-xs text-emerald-600 mt-1 font-semibold">
            Berhasil menarik kesimpulan setelah 1-2 petunjuk
          </p>
        </div>
      </div>

      {/* Student Activity Progress Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h3 className="font-extrabold text-slate-800 text-sm">
              Pantauan Aktivitas & Dialog Socratic Siswa
            </h3>
            <span className="text-xs text-slate-400">Kelas 8B • SMPN 4 Awayan</span>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama siswa..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-bold uppercase border-b border-slate-200 text-[10px]">
              <tr>
                <th className="p-3.5">Nama Siswa</th>
                <th className="p-3.5">Tahap Cerita</th>
                <th className="p-3.5">Status Pemahaman Konsep</th>
                <th className="p-3.5">Petunjuk Dipakai</th>
                <th className="p-3.5">Aktivitas Terakhir</th>
                <th className="p-3.5 text-right">Aksi Pembimbingan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((std) => (
                <tr key={std.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3.5 font-bold text-slate-900">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-[10px]">
                        {std.name[0]}
                      </div>
                      <div>
                        <span>{std.name}</span>
                        <span className="block text-[10px] text-slate-400 font-normal">{std.classRoom}</span>
                      </div>
                    </div>
                  </td>

                  <td className="p-3.5">
                    <span className="bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded text-[10px]">
                      Tahap {std.currentStage}
                    </span>
                  </td>

                  <td className="p-3.5">
                    <div className="space-y-0.5">
                      <span className={`inline-flex items-center gap-1 font-bold text-[10px] ${
                        std.monopolyMastery === 'Mahir' ? 'text-emerald-700' : 'text-amber-700'
                      }`}>
                        {std.monopolyMastery === 'Mahir' ? (
                          <CheckCircle className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <AlertCircle className="w-3 h-3 text-amber-600" />
                        )}
                        Monopoli: {std.monopolyMastery}
                      </span>
                    </div>
                  </td>

                  <td className="p-3.5 font-semibold text-slate-700">
                    {std.hintsUsed} Petunjuk
                  </td>

                  <td className="p-3.5 text-slate-400 text-[11px]">
                    {std.lastActive}
                  </td>

                  <td className="p-3.5 text-right space-x-1.5 whitespace-nowrap">
                    <button
                      onClick={() => handleGiveKudos(std.name)}
                      className="text-amber-700 hover:text-amber-800 font-bold hover:bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 transition-all inline-flex items-center gap-1"
                    >
                      <ThumbsUp className="w-3 h-3" /> Beri Bintang
                    </button>
                    <button
                      onClick={() => setFeedbackStudent(std)}
                      className="text-slate-700 hover:text-slate-900 font-bold hover:bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 transition-all inline-flex items-center gap-1"
                    >
                      <MessageSquare className="w-3 h-3" /> Beri Hint
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Custom Hint from Teacher */}
      {feedbackStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-extrabold text-slate-900 text-sm">
                Kirim Petunjuk Khusus untuk {feedbackStudent.name}
              </h4>
              <button onClick={() => setFeedbackStudent(null)} className="text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Siswa sedang berada di Tahap {feedbackStudent.currentStage}. Petunjukmu akan langsung muncul di kotak AI Tutor miliknya.
            </p>

            <form onSubmit={handleSendCustomHint} className="space-y-3">
              <textarea
                rows={3}
                value={feedbackMessage}
                onChange={(e) => setFeedbackMessage(e.target.value)}
                placeholder="Tuliskan petunjuk bertahap (contoh: Coba ingat kembali bagaimana Sultan Banjar menghadapi kapal perang VOC)..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setFeedbackStudent(null)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl flex items-center gap-1"
                >
                  <Send className="w-3 h-3" /> Kirim ke Siswa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
