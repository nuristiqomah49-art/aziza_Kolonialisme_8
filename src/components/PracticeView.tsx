import React, { useState } from 'react';
import { HOTS_QUESTIONS } from '../data/curriculumData';
import { 
  PenTool, 
  CheckCircle, 
  AlertCircle, 
  Coins, 
  HelpCircle, 
  RotateCcw, 
  Sparkles,
  Award
} from 'lucide-react';

interface PracticeViewProps {
  onAddXP: (amount: number) => void;
}

export const PracticeView: React.FC<PracticeViewProps> = ({ onAddXP }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [submittedQuestions, setSubmittedQuestions] = useState<Record<number, boolean>>({});

  const handleSelectOption = (questionId: number, key: string) => {
    if (submittedQuestions[questionId]) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: key }));
  };

  const handleCheckAnswer = (questionId: number) => {
    const question = HOTS_QUESTIONS.find(q => q.id === questionId);
    if (!question) return;

    const chosenKey = selectedAnswers[questionId];
    if (!chosenKey) return;

    setSubmittedQuestions(prev => ({ ...prev, [questionId]: true }));

    const selectedOpt = question.options.find(o => o.key === chosenKey);
    if (selectedOpt?.isCorrect) {
      onAddXP(question.xp);
    }
  };

  const handleResetQuestion = (questionId: number) => {
    setSelectedAnswers(prev => {
      const copy = { ...prev };
      delete copy[questionId];
      return copy;
    });
    setSubmittedQuestions(prev => {
      const copy = { ...prev };
      delete copy[questionId];
      return copy;
    });
  };

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <PenTool className="w-5 h-5 text-amber-600" /> Latihan Penalaran HOTS (Bukan Menghafal Tahun)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Uji daya analisis sebab-akibat, evaluasi kebijakan kolonial, dan logika sejarah maritim
          </p>
        </div>
        <span className="bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full border border-amber-200 flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5 text-amber-700" /> {HOTS_QUESTIONS.length} Soal Tersedia
        </span>
      </div>

      {/* Questions List */}
      <div className="space-y-6 max-w-4xl mx-auto">
        {HOTS_QUESTIONS.map((q) => {
          const isSubmitted = submittedQuestions[q.id];
          const chosenKey = selectedAnswers[q.id];
          const chosenOpt = q.options.find(o => o.key === chosenKey);
          const isCorrect = chosenOpt?.isCorrect;

          return (
            <div
              key={q.id}
              className={`bg-white rounded-2xl border transition-all p-6 space-y-4 shadow-xs ${
                isSubmitted
                  ? isCorrect
                    ? 'border-emerald-300 ring-2 ring-emerald-500/10'
                    : 'border-amber-300 ring-2 ring-amber-500/10'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="bg-amber-100 text-amber-800 text-[11px] font-extrabold px-2.5 py-1 rounded-md">
                    {q.title}
                  </span>
                  <span className="bg-slate-100 text-slate-600 text-[10px] font-semibold px-2 py-0.5 rounded">
                    Taksonomi: {q.bloomTaxonomy}
                  </span>
                </div>
                <span className="text-xs text-amber-700 font-extrabold flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                  <Coins className="w-3.5 h-3.5 text-amber-500 fill-amber-400" /> +{q.xp} XP
                </span>
              </div>

              <p className="font-bold text-slate-800 text-sm sm:text-base leading-relaxed">
                {q.question}
              </p>

              {/* Options */}
              <div className="space-y-2.5 pt-1">
                {q.options.map((opt) => {
                  const isThisSelected = chosenKey === opt.key;
                  let optStyle = 'border-slate-200 hover:border-amber-400 hover:bg-amber-50/30';

                  if (isSubmitted) {
                    if (opt.isCorrect) {
                      optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                    } else if (isThisSelected && !opt.isCorrect) {
                      optStyle = 'border-rose-400 bg-rose-50 text-rose-950';
                    } else {
                      optStyle = 'border-slate-200 opacity-60';
                    }
                  } else if (isThisSelected) {
                    optStyle = 'border-amber-500 bg-amber-50/60 ring-1 ring-amber-500';
                  }

                  return (
                    <button
                      key={opt.key}
                      onClick={() => handleSelectOption(q.id, opt.key)}
                      disabled={isSubmitted}
                      className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-start justify-between gap-3 ${optStyle}`}
                    >
                      <span>
                        <strong className="mr-1.5">{opt.key}.</strong> {opt.text}
                      </span>
                      {isSubmitted ? (
                        opt.isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        ) : isThisSelected ? (
                          <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                        ) : null
                      ) : (
                        <div
                          className={`w-4 h-4 rounded-full border mt-0.5 shrink-0 ${
                            isThisSelected
                              ? 'border-amber-600 bg-amber-600'
                              : 'border-slate-300'
                          }`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons */}
              {!isSubmitted ? (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => handleCheckAnswer(q.id)}
                    disabled={!chosenKey}
                    className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                      chosenKey
                        ? 'bg-amber-600 hover:bg-amber-700 text-white'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    Periksa Jawaban
                  </button>
                </div>
              ) : (
                <div className="space-y-3 pt-2">
                  <div
                    className={`p-4 rounded-xl text-xs sm:text-sm space-y-1.5 border ${
                      isCorrect
                        ? 'bg-emerald-50 text-emerald-950 border-emerald-200'
                        : 'bg-amber-50 text-amber-950 border-amber-200'
                    }`}
                  >
                    <div className="font-bold flex items-center gap-2">
                      {isCorrect ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                          <span className="text-emerald-800">Jawaban Sangat Tepat! (+{q.xp} XP)</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-4 h-4 text-amber-600" />
                          <span className="text-amber-800">Perlu Bimbingan Analisis</span>
                        </>
                      )}
                    </div>
                    <p className="text-slate-700 leading-relaxed font-sans text-xs">
                      {chosenOpt?.explanation}
                    </p>
                  </div>

                  {!isCorrect && (
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleResetQuestion(q.id)}
                        className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-amber-50 transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5" /> Coba Pikirkan Ulang
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
