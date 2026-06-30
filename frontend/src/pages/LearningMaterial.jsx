import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { BookOpen, ArrowLeft, Clock, Sparkles, ChevronRight, BrainCircuit, Lightbulb, CheckCircle2, HelpCircle } from 'lucide-react';

import { API } from '../config';

export default function LearningMaterial({ propId, onClose }) {
  const params = useParams();
  const id = propId || params.id;
  const navigate = useNavigate();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleClose = () => {
    if (onClose) onClose();
    else navigate(-1);
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${API}/resources/${id}`);
        setResource(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <div className="w-12 h-12 border-2 border-sky-500/30 border-t-sky-500 rounded-full animate-spin" />
        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Memuat Materi…</p>
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="text-center py-20 bg-white/80 rounded-3xl p-8">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Materi tidak ditemukan</h2>
        <button onClick={handleClose} className="text-sky-600 font-semibold flex items-center gap-2 mx-auto">
          <ArrowLeft className="w-4 h-4" /> Kembali
        </button>
      </div>
    );
  }

  const levelLabels = { 1: 'Dasar', 2: 'Menengah', 3: 'Lanjutan', 4: 'Ahli' };
  const levelColors = { 1: 'emerald', 2: 'sky', 3: 'amber', 4: 'rose' };
  const lvl = levelColors[resource.level_target] || 'sky';

  return (
    <div className={`max-w-3xl mx-auto ${onClose ? 'p-6 bg-slate-50/95 backdrop-blur-md rounded-3xl border border-slate-200 shadow-2xl max-h-[90vh] overflow-y-auto' : ''}`}>
      <button 
        onClick={handleClose}
        className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" /> KEMBALI KE SESI
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-strong gradient-border rounded-3xl overflow-hidden"
      >
        <div className="p-6 sm:p-10">
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <div className="bg-gradient-to-br from-sky-500 to-teal-500 text-white p-3 rounded-xl shadow-lg shadow-sky-500/20 shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] font-bold text-sky-600 uppercase tracking-widest mb-1">Materi Pembelajaran</div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">{resource.title}</h1>
            </div>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-5 mb-8 border-y border-slate-100 py-4">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
              <Clock className="w-4 h-4 shrink-0" />
              <span>{resource.estimated_minutes} Menit</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
              <BrainCircuit className="w-4 h-4 shrink-0" />
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-${lvl}-50 text-${lvl}-600 border border-${lvl}-200`}>
                Level {resource.level_target} — {levelLabels[resource.level_target]}
              </span>
            </div>
          </div>

          {/* Explanation */}
          {resource.explanation && (
            <div className="mb-8">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-sky-500" /> Penjelasan Konsep
              </h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {resource.explanation}
              </p>
            </div>
          )}

          {/* Key Points */}
          {resource.keyPoints && resource.keyPoints.length > 0 && (
            <div className="mb-8">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-500" /> Poin-poin Penting
              </h3>
              <div className="grid gap-3">
                {resource.keyPoints.map((point, i) => (
                  <div key={i} className="flex items-start gap-3 glass rounded-xl p-4">
                    <div className="bg-sky-50 border border-sky-200 text-sky-600 w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Example */}
          {resource.example && resource.example.question && (
            <div className="mb-8">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-teal-500" /> Contoh & Pembahasan
              </h3>
              <div className="glass-strong gradient-border rounded-2xl overflow-hidden">
                <div className="bg-slate-50 p-5 border-b border-slate-100">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">SOAL</div>
                  <p className="text-sm sm:text-base font-semibold text-slate-900">{resource.example.question}</p>
                </div>
                <div className="p-5">
                  <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> PEMBAHASAN
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">{resource.example.solution}</p>
                </div>
              </div>
            </div>
          )}

          {/* Tip */}
          {resource.tip && (
            <div className="bg-gradient-to-br from-sky-50 to-teal-50 rounded-2xl p-5 sm:p-6 border border-sky-100 mb-8">
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-gradient-to-br from-sky-500 to-teal-500 p-1.5 rounded-lg">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">Tips dari Agen Tutor</span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed italic">"{resource.tip}"</p>
            </div>
          )}

          <button
            onClick={handleClose}
            className="w-full py-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold transition-all shadow-lg shadow-sky-600/20 flex items-center justify-center gap-2"
          >
            Selesai Mempelajari & Lanjut Tes <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
