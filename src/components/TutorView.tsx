import React, { useState, useEffect, useRef } from 'react';
import { STORY_STAGES, ALL_RAG_SOURCES } from '../data/curriculumData';
import { VisualAnchorMap } from './VisualAnchorMap';
import { ChatMessage, RAGSource } from '../types';
import { 
  Bot, 
  Send, 
  Lightbulb, 
  Volume2, 
  VolumeX, 
  Database, 
  BookOpen, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle, 
  Coins, 
  RefreshCw,
  ExternalLink
} from 'lucide-react';

interface TutorViewProps {
  currentStage: number;
  onSelectStage: (stageNum: number) => void;
  onAddXP: (amount: number) => void;
  onOpenSourceModal: (source: RAGSource) => void;
  studentName: string;
  studentClass: string;
}

export const TutorView: React.FC<TutorViewProps> = ({
  currentStage,
  onSelectStage,
  onAddXP,
  onOpenSourceModal,
  studentName,
  studentClass
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hintLevel, setHintLevel] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const stageData = STORY_STAGES[currentStage] || STORY_STAGES[1];

  // Initialize stage chat when switching stages or student
  useEffect(() => {
    setHintLevel(0);
    const greeting = stageData.initialMessage.replace(/Ahmad/g, studentName);
    const initialMsg: ChatMessage = {
      id: `msg-init-${currentStage}-${studentName}-${Date.now()}`,
      sender: 'bot',
      text: greeting,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sourceTag: stageData.sources[0]?.title || 'Buku Siswa IPS Kelas 8',
      stage: currentStage,
    };
    setMessages([initialMsg]);

    // Optional audio read aloud on load
    if (audioEnabled && 'speechSynthesis' in window) {
      speakText(greeting);
    }
  }, [currentStage, studentName]);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Web Speech Synthesis (Suara Pak Guru AI)
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    // Clean markdown asterisks
    const plainText = text.replace(/[*_#`]/g, '');
    const utterance = new SpeechSynthesisUtterance(plainText);
    utterance.lang = 'id-ID';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const toggleSpeech = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const lastBotMessage = [...messages].reverse().find(m => m.sender === 'bot');
      if (lastBotMessage) {
        speakText(lastBotMessage.text);
      }
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText.trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      stage: currentStage,
    };

    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/tutor/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          stage: currentStage,
          history: messages.slice(-4),
          studentName,
          studentClass,
        }),
      });

      const data = await response.json();

      const botMessage: ChatMessage = {
        id: `msg-bot-${Date.now()}`,
        sender: 'bot',
        text: data.text || `Bagus sekali ${studentName}! Mari kita terus diskusikan lebih dalam.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sourceTag: data.sourceTag || stageData.sources[0]?.title || 'Buku Siswa IPS Kelas 8',
        xpBonus: data.xpBonus || 20,
        stage: currentStage,
      };

      setMessages(prev => [...prev, botMessage]);

      if (data.xpBonus) {
        onAddXP(data.xpBonus);
      }

      if (audioEnabled) {
        speakText(botMessage.text);
      }
    } catch (err) {
      console.error('Error fetching tutor response:', err);
      // Fallback
      const fallbackMsg: ChatMessage = {
        id: `msg-fallback-${Date.now()}`,
        sender: 'bot',
        text: `Pemikiran yang sangat kritis, ${studentName}! Konsep ini sangat berkaitan dengan perebutan rempah dan monopoli dagang VOC. Coba telaah bagaimana posisi geografis Nusantara mempengaruhi minat bangsa Eropa.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sourceTag: 'Buku Siswa IPS Kelas 8 (Kemendikbudristek)',
        xpBonus: 15,
        stage: currentStage,
      };
      setMessages(prev => [...prev, fallbackMsg]);
      onAddXP(15);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestHint = async () => {
    const nextLevel = Math.min(hintLevel + 1, 3);
    setHintLevel(nextLevel);

    try {
      const res = await fetch('/api/tutor/hint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stage: currentStage, hintLevel: nextLevel }),
      });
      const data = await res.json();

      const hintMessage: ChatMessage = {
        id: `msg-hint-${Date.now()}`,
        sender: 'bot',
        text: data.hint,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sourceTag: `Scaffolding Hint Level ${nextLevel}`,
        stage: currentStage,
      };

      setMessages(prev => [...prev, hintMessage]);
      if (audioEnabled) {
        speakText(hintMessage.text);
      }
    } catch (e) {
      console.error('Hint error:', e);
    }
  };

  return (
    <div className="space-y-4">
      {/* Story Flow Navigation Header */}
      <div className="bg-slate-900 rounded-2xl p-4 text-white shadow-lg flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="p-3 bg-amber-500 rounded-xl text-slate-950 font-black text-lg">
            <BookOpen className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-amber-500/20 text-amber-300 text-xs font-extrabold px-2.5 py-0.5 rounded-full border border-amber-400/30">
                Tahap {currentStage} dari 4
              </span>
              <span className="text-xs text-slate-400">SMPN 4 Awayan Tutor</span>
            </div>
            <h3 className="font-extrabold text-slate-100 text-sm sm:text-base mt-0.5">
              {stageData.title}: {stageData.subtitle}
            </h3>
          </div>
        </div>

        {/* Stage Switcher Buttons */}
        <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl w-full md:w-auto justify-center overflow-x-auto text-xs">
          {[1, 2, 3, 4].map((num) => (
            <button
              key={num}
              onClick={() => onSelectStage(num)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap ${
                num === currentStage
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {num}. {num === 1 ? 'Pemantik' : num === 2 ? 'Cerita' : num === 3 ? 'Visual' : 'Kontekstual'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Left RAG & Visual Anchor | Right Socratic Chat */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: RAG Sources & Visual Anchor (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* RAG Verified Knowledge Base */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
              <div className="flex items-center space-x-2">
                <Database className="w-4 h-4 text-amber-600" />
                <h4 className="font-bold text-slate-800 text-xs">RAG Knowledge Base</h4>
              </div>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-emerald-600" /> Terverifikasi
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mb-3 leading-relaxed">
              Tutor ini berlandaskan naskah resmi Kurikulum Merdeka Kemendikbudristek:
            </p>

            <div className="space-y-2 text-xs">
              {stageData.sources.map((src) => (
                <div
                  key={src.id}
                  onClick={() => onOpenSourceModal(src)}
                  className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1 hover:border-amber-400 hover:bg-amber-50/40 transition-all cursor-pointer group"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-800 text-[11px] group-hover:text-amber-800 transition-colors line-clamp-1">
                      {src.title}
                    </span>
                    <span className="bg-amber-100 text-amber-800 text-[9px] px-1.5 py-0.2 rounded font-bold shrink-0 ml-1">
                      {src.badge}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 line-clamp-2">{src.excerpt}</p>
                  <div className="text-[9px] text-amber-700 font-bold flex items-center gap-1 pt-0.5">
                    <ExternalLink className="w-2.5 h-2.5" /> Buka teks kurikulum ({src.pageRef})
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Visual Anchor Component */}
          <VisualAnchorMap stage={currentStage} />

          {/* Socratic Pedagogical Guardrail Notice */}
          <div className="bg-slate-100 rounded-xl p-3 border border-slate-200 text-[11px] text-slate-500 flex items-start space-x-2">
            <ShieldCheck className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
            <span className="leading-relaxed">
              <strong>Pedagogical Guardrail:</strong> AI tidak akan langsung memberikan contekan jawaban instan untuk PR/Tugas. Siswa dibimbing dengan pertanyaan nalar agar berpikir kritis mandiri.
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: Socratic Chat Interface (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col h-[670px] relative overflow-hidden">
          {/* Chat Header Bar */}
          <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-xs">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <span className="w-3 h-3 bg-emerald-500 border-2 border-white rounded-full absolute bottom-0 right-0"></span>
              </div>
              <div>
                <h4 className="font-extrabold text-slate-800 text-xs sm:text-sm flex items-center gap-2">
                  Pak Guru AI (Tutor IPS SMPN 4 Awayan)
                </h4>
                <p className="text-[11px] text-slate-500 font-medium">
                  Pendekatan Socratic Dialog • Ramah & Edukatif
                </p>
              </div>
            </div>

            {/* Hint & Audio Controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleSpeech}
                title={isSpeaking ? 'Hentikan Suara' : 'Dengarkan Suara Guru'}
                className={`p-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isSpeaking
                    ? 'bg-amber-500 text-slate-950 animate-pulse'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span className="hidden sm:inline text-[11px]">
                  {isSpeaking ? 'Berhenti' : 'Suara Guru'}
                </span>
              </button>

              <button
                onClick={handleRequestHint}
                disabled={hintLevel >= 3}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-1.5 shadow-2xs ${
                  hintLevel >= 3
                    ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                    : 'bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-300'
                }`}
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-700" />
                <span>
                  {hintLevel === 0 ? 'Minta Petunjuk' : `Petunjuk ${hintLevel}/3`}
                </span>
              </button>
            </div>
          </div>

          {/* Chat Messages Scroll Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar bg-slate-50/40">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold text-xs shadow-xs shrink-0 mt-0.5">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-xs text-xs sm:text-sm leading-relaxed space-y-2 ${
                    msg.sender === 'user'
                      ? 'bg-amber-600 text-white rounded-tr-none'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'
                  }`}
                >
                  <div className="whitespace-pre-line font-sans">
                    {msg.text.split('**').map((part, i) =>
                      i % 2 === 1 ? <strong key={i} className="font-extrabold">{part}</strong> : part
                    )}
                  </div>

                  {msg.sender === 'bot' && (
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3 text-amber-600" /> {msg.sourceTag}
                      </span>
                      {msg.xpBonus && (
                        <span className="text-amber-700 font-extrabold flex items-center gap-0.5 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                          <Coins className="w-3 h-3 text-amber-500 fill-amber-400" /> +{msg.xpBonus} XP
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-amber-100 border-2 border-amber-500 flex items-center justify-center font-bold text-xs text-amber-800 shrink-0 mt-0.5">
                    {studentName ? studentName[0].toUpperCase() : 'S'}
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center space-x-2 text-xs text-slate-400 font-medium pl-2">
                <RefreshCw className="w-4 h-4 animate-spin text-amber-600" />
                <span>Pak Guru AI sedang membaca RAG Buku Siswa IPS Kelas 8...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Suggestion Chips */}
          <div className="px-4 py-2 bg-slate-100/90 border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto text-xs">
            <span className="text-slate-400 font-bold whitespace-nowrap text-[10px]">
              Bantuan Cepat:
            </span>
            <button
              onClick={() => handleSendMessage('Mengapa harga rempah Pala dan Cengkih dulu sangat mahal di Eropa?')}
              className="bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-900 border border-slate-200 rounded-full px-3 py-1 font-medium whitespace-nowrap transition-all text-xs"
            >
              🌶️ Mengapa Rempah Mahal?
            </button>
            <button
              onClick={() => handleSendMessage('Apa bedanya Kolonialisme dengan Imperialisme?')}
              className="bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-900 border border-slate-200 rounded-full px-3 py-1 font-medium whitespace-nowrap transition-all text-xs"
            >
              ⚔️ Kolonialisme vs Imperialisme
            </button>
            <button
              onClick={() => handleSendMessage('Apa itu konsep 3G (Gold, Glory, Gospel)?')}
              className="bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-900 border border-slate-200 rounded-full px-3 py-1 font-medium whitespace-nowrap transition-all text-xs"
            >
              👑 Konsep 3G
            </button>
            <button
              onClick={() => handleSendMessage('Bagaimana peran Kesultanan Banjar dan Pangeran Antasari melawan Belanda?')}
              className="bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-900 border border-slate-200 rounded-full px-3 py-1 font-medium whitespace-nowrap transition-all text-xs"
            >
              🏰 Jejak Perang Banjar
            </button>
          </div>

          {/* Chat Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Tuliskan jawaban dari pertanyaan AI atau ajukan pertanyaanmu di sini..."
              className="flex-1 bg-slate-100 border border-slate-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 shadow-md ${
                !inputText.trim() || isLoading
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-amber-600 hover:bg-amber-700 text-white'
              }`}
            >
              <Send className="w-3.5 h-3.5" /> Kirim
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
