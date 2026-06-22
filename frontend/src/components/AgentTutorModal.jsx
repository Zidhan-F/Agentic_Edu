import { useState } from 'react';
import { BookOpen, X, ChevronRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LearningMaterial from '../pages/LearningMaterial';

export default function AgentTutorModal({ recommendation, onClose }) {
  const [showMaterial, setShowMaterial] = useState(false);
  
  if (!recommendation) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => !showMaterial && onClose()}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
      />

      <AnimatePresence mode="wait">
        {showMaterial ? (
          <motion.div
            key="material"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative z-10 w-full max-w-3xl"
          >
            <LearningMaterial propId={recommendation.conceptId} onClose={onClose} />
          </motion.div>
        ) : (
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            className="glass-strong gradient-border rounded-2xl w-full max-w-md overflow-hidden relative z-10"
          >
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-sky-500/10 blur-[40px] rounded-full pointer-events-none" />

        <div className="p-6 sm:p-7 relative">
          <button
            onClick={onClose}
            className="absolute top-4 sm:top-5 right-4 sm:right-5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 p-1.5 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-gradient-to-br from-sky-500 to-teal-500 p-2.5 rounded-xl shadow-lg shadow-sky-500/20 border border-sky-200">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Agen Tutor</h3>
              <p className="text-[10px] sm:text-[11px] text-sky-600 font-semibold uppercase tracking-wider">Intervensi Dipicu</p>
            </div>
          </div>

          {/* Message */}
          <div className="bg-sky-50 rounded-xl p-4 mb-5 border border-sky-200">
            <p className="text-slate-700 leading-relaxed text-xs sm:text-sm italic">"{recommendation.message}"</p>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 mb-4">{recommendation.instruction}</p>

          <button
            onClick={() => setShowMaterial(true)}
            className="w-full text-left group"
          >
            <div className="glass glass-hover gradient-border rounded-xl p-4 flex items-center justify-between">
              <div className="max-w-[80%]">
                <span className="text-[9px] sm:text-[10px] font-bold text-sky-600 uppercase tracking-wider block mb-0.5">Sumber Belajar Rekomendasi</span>
                <h4 className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-sky-700 transition-colors truncate">
                  {recommendation.resourceTitle || 'Materi Pembelajaran'}
                </h4>
              </div>
              <div className="bg-sky-500 text-white p-2 rounded-lg group-hover:scale-105 transition-transform shrink-0">
                <BookOpen className="w-4 h-4" />
              </div>
            </div>
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            className="w-full mt-5 glass glass-hover rounded-xl py-3.5 text-sm font-semibold text-slate-700 transition-all border border-slate-200"
          >
            Lanjut ke Soal Berikutnya →
          </button>
        </div>
        </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
