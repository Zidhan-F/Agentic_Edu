import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, XCircle, Clock, Zap, BookOpen } from 'lucide-react';
import AiTutorChat from '../components/AiTutorChat';

const API = 'http://localhost:5000/api';

export default function QuizReview({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeQuestion, setActiveQuestion] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        let historyId = id;
        if (id === 'recent') {
          const dash = await axios.get(`${API}/dashboard/${user._id}`);
          if (dash.data.history && dash.data.history.length > 0) {
            historyId = dash.data.history[0]._id;
          }
        }
        
        const res = await axios.get(`${API}/quiz-history/${historyId}`);
        setHistory(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, user._id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-2 border-sky-500/30 border-t-sky-500 rounded-full animate-spin" />
    </div>
  );

  if (!history || !history.details || history.details.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <BookOpen className="w-16 h-16 text-slate-300 mb-4" />
        <h2 className="text-xl font-bold text-slate-700 mb-2">Detail Tidak Ditemukan</h2>
        <p className="text-slate-500 mb-6 text-sm">Maaf, detail pembahasan untuk sesi ini tidak tersedia (mungkin sesi lama).</p>
        <button onClick={() => navigate('/dashboard')} className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold">Kembali ke Dashboard</button>
      </div>
    );
  }

  const q = history.details[activeQuestion];
  const iqColor = history.estimatedIQ >= 120 ? 'emerald' : history.estimatedIQ >= 100 ? 'sky' : history.estimatedIQ >= 85 ? 'amber' : 'rose';

  return (
    <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 pb-12 pt-8 px-4 sm:px-6">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate('/dashboard')} className="p-2 glass rounded-xl text-slate-500 hover:text-slate-900 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Review Pembahasan</h1>
          <p className="text-xs text-slate-500 mt-1">Sesi Kuis • Skor: {history.score}/{history.total} • IQ: {history.estimatedIQ}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-3">
          <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-2">Daftar Soal</h3>
          <div className="grid grid-cols-5 lg:grid-cols-4 gap-2">
            {history.details.map((detail, i) => (
              <button
                key={i}
                onClick={() => setActiveQuestion(i)}
                className={`aspect-square rounded-xl flex items-center justify-center text-sm font-bold transition-all border ${activeQuestion === i ? 'border-sky-400 bg-sky-50 shadow-md scale-105' : 'border-transparent glass glass-hover'} ${detail.isCorrect ? 'text-emerald-600' : 'text-rose-600'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          
          <div className={`mt-6 glass rounded-2xl p-5 border-${iqColor}-200 bg-${iqColor}-50`}>
            <div className="flex items-center gap-2 mb-1">
              <Zap className={`w-4 h-4 text-${iqColor}-500`} />
              <span className={`text-[10px] sm:text-xs font-bold text-${iqColor}-600 uppercase tracking-wider`}>Evaluasi Strategist</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed mt-2">{history.label}</p>
          </div>
        </div>

        {/* Detail View */}
        <div className="lg:col-span-2 space-y-4">
          <motion.div
            key={activeQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-strong gradient-border rounded-2xl p-6 sm:p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] font-bold text-sky-600 bg-sky-50 border border-sky-200 px-2 py-1 rounded-md uppercase tracking-wider">
                {q.conceptName}
              </span>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                <Clock className="w-3.5 h-3.5" /> {q.timeSpent}d
              </div>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug mb-8">
              {q.content}
            </h3>

            <div className="space-y-4 mb-8">
              {/* Selected Answer */}
              <div className={`p-4 rounded-xl border flex items-start gap-3 ${q.isCorrect ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
                {q.isCorrect ? <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> : <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />}
                <div>
                  <div className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${q.isCorrect ? 'text-emerald-600' : 'text-rose-600'}`}>
                    Jawaban Anda {q.isCorrect ? '(Benar)' : '(Salah)'}
                  </div>
                  <div className={`text-sm font-semibold ${q.isCorrect ? 'text-emerald-900' : 'text-rose-900'}`}>
                    {q.selectedAnswer || 'Tidak Menjawab (Waktu Habis)'}
                  </div>
                </div>
              </div>

              {/* Correct Answer (if wrong) */}
              {!q.isCorrect && (
                <div className="p-4 rounded-xl border bg-emerald-50 border-emerald-200 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider mb-1 text-emerald-600">Jawaban Benar</div>
                    <div className="text-sm font-semibold text-emerald-900">{q.correctAnswer}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Explanation Box */}
            <div className="bg-sky-50/50 border border-sky-100 rounded-xl p-5 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-sky-500" />
                <h4 className="text-xs font-bold text-sky-700 uppercase tracking-wide">Pembahasan Singkat</h4>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                {q.explanation}
              </p>
            </div>

            {/* Learning Material Link */}
            {q.conceptId && (
              <button 
                onClick={() => navigate(`/learning/${q.conceptId}`)}
                className="w-full mb-8 py-4 rounded-xl bg-gradient-to-r from-sky-600 to-teal-500 hover:from-sky-500 hover:to-teal-400 text-white font-bold transition-all shadow-lg shadow-sky-600/20 flex items-center justify-center gap-2 group"
              >
                <BookOpen className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Pelajari Materi Lengkap "{q.conceptName}"
              </button>
            )}
          </motion.div>
          
          <div className="flex gap-3 justify-between">
             <button 
               onClick={() => setActiveQuestion(prev => Math.max(0, prev - 1))}
               disabled={activeQuestion === 0}
               className="px-4 py-3 rounded-xl glass glass-hover text-sm font-bold text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
             >
               Soal Sebelumnya
             </button>
             <button 
               onClick={() => setActiveQuestion(prev => Math.min(history.details.length - 1, prev + 1))}
               disabled={activeQuestion === history.details.length - 1}
               className="px-4 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-sm font-bold shadow-lg shadow-sky-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
             >
               Soal Selanjutnya
             </button>
          </div>
        </div>
      </div>
      
      <AiTutorChat context={q} />
    </div>
  );
}
