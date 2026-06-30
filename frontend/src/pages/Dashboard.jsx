import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Play, ArrowRight, Activity, TrendingUp, Compass,
  Flame, Brain, BarChart3, BookOpen, Sparkles, AlertTriangle,
  Clock, Zap
} from 'lucide-react';

import { API } from '../config';

const categoryColors = {
  'Logical Reasoning': { bg: 'bg-sky-500/10', border: 'border-sky-500/20', text: 'text-sky-400', bar: 'bg-sky-500' },
  'Numerical Ability': { bg: 'bg-teal-500/10', border: 'border-teal-500/20', text: 'text-teal-400', bar: 'bg-teal-500' },
  'Verbal Intelligence': { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400', bar: 'bg-emerald-500' },
  'Spatial Reasoning': { bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', text: 'text-cyan-400', bar: 'bg-cyan-500' },
  'Pattern Recognition': { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400', bar: 'bg-blue-500' },
};

const categoryTranslations = {
  'Logical Reasoning': 'Penalaran Logis',
  'Numerical Ability': 'Kemampuan Numerik',
  'Verbal Intelligence': 'Kecerdasan Verbal',
  'Spatial Reasoning': 'Penalaran Spasial',
  'Pattern Recognition': 'Pengenalan Pola',
};

export default function Dashboard({ user, isAiActive }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const dashRes = await axios.get(`${API}/dashboard/${user._id}`);
        setData({ ...dashRes.data, uid: user._id });
      } catch (err) {
        console.error(err);
      } finally {
        setTimeout(() => setLoading(false), 600);
      }
    })();
  }, [user._id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 rounded-full border-2 border-sky-500/30 border-t-sky-500 animate-spin" />
        </div>
        <p className="text-[10px] text-slate-500 tracking-widest uppercase font-bold">Menganalisis Kemahiran…</p>
      </div>
    );
  }

  const { recommendation, proficiencies, uid, rank, user: dbUser } = data || {};

  return (
    <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
      {/* ── Greeting ──────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div className="flex items-center gap-4">
          {dbUser?.picture ? (
            <img 
              src={dbUser.picture} 
              alt="Profil" 
              referrerPolicy="no-referrer"
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-sky-500/30" 
            />
          ) : (
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-sky-500/10 border-2 border-sky-500/20 flex items-center justify-center">
               <Brain className="w-8 h-8 text-sky-400" />
            </div>
          )}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Selamat datang, {dbUser?.name?.split(' ')[0] || 'Pelajar'}
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              {isAiActive 
                ? 'Agen AI Anda telah menyiapkan jalur belajar pribadi.' 
                : 'Sistem AI sedang dinonaktifkan. Anda dalam mode asesmen mandiri.'}
            </p>
          </div>
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <div className="flex-1 md:flex-none flex items-center justify-center gap-1.5 glass px-4 py-2.5 rounded-xl text-xs font-bold text-amber-600">
            <Flame className="w-4 h-4" /> {dbUser?.streak || 0} Hari Streak
          </div>
          <div className="flex-1 md:flex-none flex items-center justify-center gap-1.5 glass px-4 py-2.5 rounded-xl text-xs font-bold text-sky-600">
            <TrendingUp className="w-4 h-4" /> Top {rank || 99}%
          </div>
        </div>
      </motion.div>

      {/* ── Agent Recommendation Card ─────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={`glass-strong gradient-border rounded-2xl sm:rounded-3xl overflow-hidden relative transition-all ${!isAiActive ? 'opacity-60 grayscale-[0.5]' : ''}`}
      >
        <div className="absolute top-0 right-0 w-48 sm:w-72 h-48 sm:h-72 bg-sky-500/10 rounded-full blur-[60px] sm:blur-[80px] pointer-events-none" />

        <div className="p-6 sm:p-8 relative z-10">
          <div className="flex items-center gap-2.5 mb-5">
            <div className={`p-2 rounded-lg border ${isAiActive ? 'bg-sky-50 border-sky-200' : 'bg-slate-100 border-slate-200'}`}>
              <Compass className={`w-5 h-5 ${isAiActive ? 'text-sky-600' : 'text-slate-500'}`} />
            </div>
            <h2 className={`text-sm sm:text-base font-bold ${isAiActive ? 'text-slate-900' : 'text-slate-500'}`}>Analisis Strategist</h2>
            <span className={`ml-auto text-[9px] sm:text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-md border ${isAiActive ? 'bg-sky-50 text-sky-600 border-sky-200' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
              {isAiActive ? 'Heuristic Engine' : 'AI Nonaktif'}
            </span>
          </div>

          <div className={`glass rounded-xl p-5 mb-6 ${!isAiActive ? 'border-dashed border-slate-300' : ''}`}>
            {isAiActive ? (
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic">
                "{recommendation?.message || 'Memulai analisis profil kognitif Anda... Selesaikan satu tes untuk mendapatkan rekomendasi spesifik.'}"
              </p>
            ) : (
              <div className="flex items-center gap-3 text-slate-500 py-2">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <p className="text-sm">Aktifkan sistem AI di menu navigasi untuk mendapatkan rekomendasi belajar pribadi dari Agen Strategist.</p>
              </div>
            )}
          </div>

          <button
            onClick={() => navigate('/quiz')}
            className="group w-full glass glass-hover gradient-border rounded-xl p-4 sm:p-5 flex items-center justify-between transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="bg-sky-50 p-3 rounded-xl border border-sky-200 group-hover:bg-sky-500 group-hover:border-sky-400 transition-all shrink-0">
                <Play className="w-5 h-5 sm:w-6 sm:h-6 text-sky-500 group-hover:text-white fill-current transition-colors" />
              </div>
              <div className="text-left">
                <div className="text-[10px] font-bold text-sky-600 uppercase tracking-wider mb-0.5">Mulai Asesmen</div>
                <div className="text-base sm:text-lg font-bold text-slate-900">Tes IQ — 20 Soal Acak</div>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
          </button>
        </div>
      </motion.div>

      {/* ── Proficiency Matrix ────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-2 mb-5">
          <BarChart3 className="w-4 h-4 text-slate-500" />
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Matriks Kemahiran</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {(proficiencies || []).map((p, i) => {
            const c = categoryColors[p.topicName] || categoryColors['Logical Reasoning'];
            const label = categoryTranslations[p.topicName] || p.topicName;
            return (
              <motion.div
                key={p._id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="glass rounded-xl sm:rounded-2xl p-4 sm:p-5 glass-hover"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${c.bg} ${c.border} border ${c.text} uppercase tracking-wide`}>
                    {label}
                  </span>
                  <span className="text-xl font-bold text-slate-900">{p.masteryScore}%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${c.bar} transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(14,165,233,0.3)]`} style={{ width: `${p.masteryScore}%` }} />
                </div>
                <div className="flex justify-between mt-3 text-[10px] font-medium text-slate-500">
                  <span>{p.correctAnswers}/{p.totalAttempts} benar</span>
                  <span className="uppercase tracking-tighter">
                    {p.masteryScore >= 80 ? 'Mahir' : p.masteryScore >= 50 ? 'Belajar' : 'Perlu Usaha'}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── IQ Test History ────────────────────────────── */}
        {data?.history && data.history.length > 0 && (
          <div className="mt-8 sm:mt-12">
            <div className="flex items-center gap-2 mb-5">
              <Clock className="w-4 h-4 text-slate-500" />
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Riwayat Tes IQ</h3>
            </div>
            
            <div className="space-y-3">
              {data.history.map((hist, i) => {
                const iqColor = hist.estimatedIQ >= 120 ? 'emerald' : hist.estimatedIQ >= 100 ? 'sky' : hist.estimatedIQ >= 85 ? 'amber' : 'rose';
                const date = new Date(hist.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
                
                return (
                  <motion.div
                    key={hist._id || i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => navigate(`/review/${hist._id}`)}
                    className="glass rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-hover cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold text-slate-900">Skor: {hist.score}/{hist.total}</span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase px-2 py-0.5 rounded bg-slate-100">{hist.percentage}%</span>
                      </div>
                      <div className="text-[10px] sm:text-xs text-slate-500">{date}</div>
                      <div className="text-[10px] font-bold text-sky-600 mt-2 flex items-center gap-1 uppercase tracking-widest">
                        Lihat Pembahasan <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className={`px-3 py-1.5 rounded-lg border border-${iqColor}-200 bg-${iqColor}-50 flex items-center gap-2`}>
                        <Zap className={`w-3.5 h-3.5 text-${iqColor}-500`} />
                        <span className={`text-xs font-bold text-${iqColor}-600`}>{hist.label}</span>
                      </div>
                      <div className="text-right min-w-[70px]">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Estimasi IQ</div>
                        <div className={`text-xl font-bold text-${iqColor}-600 leading-none`}>{hist.estimatedIQ}</div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
