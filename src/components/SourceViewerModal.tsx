import React from 'react';
import { RAGSource } from '../types';
import { X, BookOpen, CheckCircle, ExternalLink } from 'lucide-react';

interface SourceViewerModalProps {
  source: RAGSource | null;
  onClose: () => void;
}

export const SourceViewerModal: React.FC<SourceViewerModalProps> = ({ source, onClose }) => {
  if (!source) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-amber-100 rounded-lg text-amber-800">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                {source.badge}
              </span>
              <h3 className="font-extrabold text-slate-900 text-sm mt-0.5">{source.title}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-200/60 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs leading-relaxed text-slate-700 custom-scrollbar">
          <div className="flex items-center justify-between bg-emerald-50 text-emerald-900 px-3.5 py-2 rounded-xl border border-emerald-200">
            <span className="flex items-center gap-1.5 font-bold">
              <CheckCircle className="w-4 h-4 text-emerald-600" /> Dokumen Terverifikasi Kemendikbudristek
            </span>
            <span className="font-semibold text-[11px] text-emerald-800">{source.pageRef || 'Bab 1 - 2'}</span>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-1">Penerbit Resmi & Kurikulum:</h4>
            <p className="text-slate-600">{source.publisher}</p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-1">Ringkasan Konsep:</h4>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-slate-700">
              {source.excerpt}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-1">Naskah Pembelajaran (RAG Knowledge):</h4>
            <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-200 text-slate-800 space-y-2 leading-relaxed font-sans">
              {source.fullContent || source.excerpt}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all"
          >
            Tutup Dokumen
          </button>
        </div>
      </div>
    </div>
  );
};
