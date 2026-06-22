import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, Clock, ChevronRight, CheckCircle2, AlertCircle, 
  ArrowLeft, BarChart3, Target, Sparkles, X, Compass, TrendingUp, Award, Zap
} from 'lucide-react';
import { io } from 'socket.io-client';
import AgentTutorModal from '../components/AgentTutorModal';

const API = 'http://localhost:5000/api';

const categoryMeta = {
  'Logika Silogisme':      { icon: Brain, color: 'sky', category: 'Penalaran Logis' },
  'Logika Urutan':         { icon: Target, color: 'teal', category: 'Penalaran Logis' },
  'Logika Kalender':       { icon: Clock, color: 'blue', category: 'Penalaran Logis' },
  'Logika Kontrapositif':  { icon: AlertCircle, color: 'cyan', category: 'Penalaran Logis' },
  'Deret Angka':           { icon: BarChart3, color: 'sky', category: 'Kemampuan Numerik' },
  'Persentase':            { icon: Sparkles, color: 'teal', category: 'Kemampuan Numerik' },
  'Geometri Sudut':        { icon: Target, color: 'blue', category: 'Kemampuan Numerik' },
  'Kecepatan Rata-rata':   { icon: Clock, color: 'cyan', category: 'Kemampuan Numerik' },
  'Klasifikasi Verbal':    { icon: Brain, color: 'sky', category: 'Kecerdasan Verbal' },
  'Analogi Verbal':        { icon: Target, color: 'teal', category: 'Kecerdasan Verbal' },
  'Sinonim':               { icon: Sparkles, color: 'blue', category: 'Kecerdasan Verbal' },
  'Pemahaman Peribahasa':  { icon: CheckCircle2, color: 'cyan', category: 'Kecerdasan Verbal' },
  'Visualisasi Ruang':     { icon: Brain, color: 'sky', category: 'Penalaran Spasial' },
  'Bayangan Cermin':       { icon: Target, color: 'teal', category: 'Penalaran Spasial' },
  'Paper Folding':         { icon: Sparkles, color: 'blue', category: 'Penalaran Spasial' },
  'Orientasi Arah':        { icon: Compass, color: 'cyan', category: 'Penalaran Spasial' },
  'Deret Fibonacci':       { icon: Brain, color: 'sky', category: 'Pengenalan Pola' },
  'Enkripsi Pola':         { icon: Target, color: 'teal', category: 'Pengenalan Pola' },
  'Deret Geometri':        { icon: Sparkles, color: 'blue', category: 'Pengenalan Pola' },
  'Sandi Caesar':           { icon: Target, color: 'cyan', category: 'Pengenalan Pola' },
};

/* ── IQ Prediction Engine ──────────────────────────────── */
function predictIQ(score, total, categoryScores) {
  if (total === 0) return { iq: 100, label: 'Rata-rata', desc: '' };
  const pct = (score / total) * 100;

  // Weighted IQ: base 70, max ~145
  // Uses a sigmoid-like curve so mid-range scores map near 100
  const z = (pct - 50) / 25; // normalize around 50%
  const sigmoid = 1 / (1 + Math.exp(-z));
  const iq = Math.round(70 + sigmoid * 75);

  let label, desc;
  if (iq >= 140) { label = 'Sangat Superior'; desc = 'Kemampuan kognitif luar biasa, setara top 0.4% populasi.'; }
  else if (iq >= 130) { label = 'Superior'; desc = 'Kemampuan berpikir sangat tinggi, setara top 2% populasi.'; }
  else if (iq >= 120) { label = 'Di Atas Rata-rata Tinggi'; desc = 'Kemampuan analitis dan logika sangat baik.'; }
  else if (iq >= 110) { label = 'Di Atas Rata-rata'; desc = 'Kemampuan berpikir di atas rata-rata populasi.'; }
  else if (iq >= 90) { label = 'Rata-rata'; desc = 'Kemampuan kognitif normal dan sehat.'; }
  else if (iq >= 80) { label = 'Di Bawah Rata-rata'; desc = 'Latihan rutin dapat meningkatkan kemampuan Anda.'; }
  else { label = 'Perlu Pengembangan'; desc = 'Disarankan berlatih lebih intensif untuk meningkatkan kemampuan.'; }

  // Category breakdown
  const catDetails = Object.entries(categoryScores).map(([cat, data]) => {
    const catPct = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
    return { category: cat, correct: data.correct, total: data.total, percentage: catPct };
  });

  return { iq, label, desc, categoryDetails: catDetails, percentage: Math.round(pct) };
}

export default function QuizSession({ user, isAiActive }) {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timer, setTimer] = useState(60);
  const [nudge, setNudge] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [results, setResults] = useState(null);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [categoryScores, setCategoryScores] = useState({});
  const [currentDifficulty, setCurrentDifficulty] = useState(3);
  const [details, setDetails] = useState([]);
  const autoAdvancedRef = useRef(false);
  const TOTAL_QUESTIONS = 20;

  const fetchNextQuestion = async (diff, exclude) => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/questions/adaptive?difficulty=${diff}&excludeIds=${exclude.join(',')}`);
      if (res.data) {
        setQuestions(prev => {
          // Prevent duplicates if already fetched
          if (prev.some(q => q._id === res.data._id)) return prev;
          return [...prev, res.data];
        });
        return true;
      }
      return false;
    } catch (err) { 
      console.error(err);
      return false;
    }
    finally { setLoading(false); }
  };

  useEffect(() => {
    const saved = sessionStorage.getItem('quiz_session');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.results || (parsed.idx > 0 && !parsed.answered)) {
        // If an old session is already finished or bugged from old format, clear it and start fresh
        sessionStorage.removeItem('quiz_session');
      } else {
        setQuestions(parsed.questions || []);
        setIdx(parsed.idx || 0);
        setScore(parsed.score || 0);
        setAnswered(parsed.answered || 0);
        setCategoryScores(parsed.categoryScores || {});
        setCurrentDifficulty(parsed.currentDifficulty || 3);
        setDetails(parsed.details || []);
        setLoading(false);
        return;
      }
    }

    fetchNextQuestion(3, []);
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      sessionStorage.setItem('quiz_session', JSON.stringify({ 
        questions, idx, results, score, answered, categoryScores, currentDifficulty, details
      }));
    }
  }, [questions, idx, results, score, answered, categoryScores, currentDifficulty, details]);

  // ── Timer countdown ──
  useEffect(() => {
    if (loading || results || showExitConfirm || !questions.length) return;
    autoAdvancedRef.current = false;
    const t = setInterval(() => setTimer(prev => (prev > 0 ? prev - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [loading, results, showExitConfirm, questions, idx]);

  // ── Auto-advance when timer hits 0 ──
  useEffect(() => {
    if (timer === 0 && !results && !autoAdvancedRef.current && questions.length > 0 && questions[idx]) {
      autoAdvancedRef.current = true;
      // Time's up = wrong answer, advance automatically
      handleTimeUp();
    }
  }, [timer, results, questions.length]);

  const handleTimeUp = () => {
    const q = questions[idx];
    if (!q) return;
    const cat = categoryMeta[q.conceptName]?.category || 'Umum';
    
    const newAnswered = answered + 1;
    const newCatScores = { ...categoryScores };
    if (!newCatScores[cat]) newCatScores[cat] = { correct: 0, total: 0 };
    newCatScores[cat] = { correct: newCatScores[cat].correct, total: newCatScores[cat].total + 1 };
    
    setCategoryScores(newCatScores);
    setAnswered(newAnswered);

    const newDetails = [...details, {
      questionId: q._id,
      content: q.content,
      conceptName: q.conceptName,
      selectedAnswer: null,
      correctAnswer: q.correct_answer,
      isCorrect: false,
      explanation: q.explanation || `Jawaban yang benar adalah ${q.correct_answer}.`,
      timeSpent: 60
    }];
    setDetails(newDetails);

    const newDifficulty = Math.max(1, currentDifficulty - 1);
    setCurrentDifficulty(newDifficulty);

    // Try to post the wrong answer
    axios.post(`${API}/answer`, {
      userId: user._id,
      questionId: q._id,
      isCorrect: false
    }).catch(() => {});

    advanceQuestion(false, score, newAnswered, newCatScores, newDetails, newDifficulty);
  };

  useEffect(() => {
    if (!questions.length || results || !isAiActive) return;
    const s = io('http://localhost:5000');
    s.on('connect', () => s.emit('start_session', { userId: user._id, questionId: questions[idx]._id }));
    s.on('agent_nudge', d => setNudge(d));
    const hb = setInterval(() => s.emit('heartbeat'), 10000);
    return () => { clearInterval(hb); s.disconnect(); };
  }, [idx, questions, user._id, results, isAiActive]);

  const handleSubmit = useCallback(async () => {
    if (selected === null) return;
    
    const q = questions[idx];
    const isCorrect = selected === q.correct_answer;
    const cat = categoryMeta[q.conceptName]?.category || 'Umum';

    const newScore = score + (isCorrect ? 1 : 0);
    const newAnswered = answered + 1;
    const newCatScores = { ...categoryScores };
    if (!newCatScores[cat]) newCatScores[cat] = { correct: 0, total: 0 };
    newCatScores[cat] = { 
      correct: newCatScores[cat].correct + (isCorrect ? 1 : 0), 
      total: newCatScores[cat].total + 1 
    };

    setScore(newScore);
    setAnswered(newAnswered);
    setCategoryScores(newCatScores);

    const newDetails = [...details, {
      questionId: q._id,
      content: q.content,
      conceptName: q.conceptName,
      conceptId: q.concept_id,
      selectedAnswer: selected,
      correctAnswer: q.correct_answer,
      isCorrect,
      explanation: q.explanation || `Jawaban yang benar adalah ${q.correct_answer}.`,
      timeSpent: 60 - timer
    }];
    setDetails(newDetails);

    let newDifficulty = currentDifficulty;
    if (isCorrect && newDifficulty < 5) newDifficulty++;
    else if (!isCorrect && newDifficulty > 1) newDifficulty--;
    setCurrentDifficulty(newDifficulty);

    const res = await axios.post(`${API}/answer`, { 
      userId: user._id,
      questionId: q._id, 
      isCorrect 
    });

    if (isAiActive && !isCorrect && res.data.recommendation) {
      setRecommendation(res.data.recommendation);
    } else {
      advanceQuestion(isCorrect, newScore, newAnswered, newCatScores, newDetails, newDifficulty);
    }
  }, [idx, selected, questions, isAiActive, score, answered, categoryScores, currentDifficulty, details, timer]);

  const advanceQuestion = async (wasCorrect, currentScore = score, currentAnswered = answered, currentCatScores = categoryScores, currentDetails = details, nextDiff = currentDifficulty) => {
    if (idx < TOTAL_QUESTIONS - 1) {
      setTimer(60);
      setNudge(null);
      setRecommendation(null);
      
      const exclude = questions.map(q => q._id);
      const success = await fetchNextQuestion(nextDiff, exclude);
      
      if (success) {
        setIdx(prev => prev + 1);
        setSelected(null);
      } else {
        await finishQuiz(currentScore, currentAnswered, currentCatScores, currentDetails);
      }
    } else {
      await finishQuiz(currentScore, currentAnswered, currentCatScores, currentDetails);
    }
  };

  const finishQuiz = async (currentScore, currentAnswered, currentCatScores, currentDetails) => {
    const prediction = predictIQ(currentScore, currentAnswered, currentCatScores);
    const finalResults = { score: currentScore, total: currentAnswered, details: currentDetails, ...prediction };
    
    try {
      await axios.post(`${API}/quiz-history`, {
        userId: user._id,
        score: currentScore,
        total: currentAnswered,
        percentage: prediction.percentage,
        estimatedIQ: prediction.iq,
        label: prediction.label,
        categoryDetails: prediction.categoryDetails,
        details: currentDetails
      });
    } catch (err) {
      console.error("Failed to save history", err);
    }

    setResults(finalResults);
    sessionStorage.removeItem('quiz_session');
  };

  // When recommendation modal closes (wrong answer with AI), advance
  const handleRecommendationClose = () => {
    advanceQuestion(false, score, answered, categoryScores, details, currentDifficulty);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-2 border-sky-500/30 border-t-sky-500 rounded-full animate-spin" />
    </div>
  );

  if (results) {
    const iqColor = results.iq >= 120 ? 'emerald' : results.iq >= 100 ? 'sky' : results.iq >= 85 ? 'amber' : 'rose';
    return (
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-slate-50">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-strong gradient-border rounded-3xl p-8 sm:p-10 max-w-2xl w-full">
          <div className="text-center mb-8">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-${iqColor}-50 border border-${iqColor}-200 rounded-2xl flex items-center justify-center mx-auto mb-6`}>
              <Award className={`w-8 h-8 sm:w-10 sm:h-10 text-${iqColor}-500`} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Asesmen Selesai</h2>
            <p className="text-slate-600 text-sm">
              {isAiActive ? 'Profil kognitif Anda telah diperbarui oleh Agen Strategist.' : 'Asesmen Anda telah selesai direkam.'}
            </p>
          </div>

          {/* Main Stats */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6 text-left">
            <div className="glass rounded-2xl p-4 sm:p-5">
              <span className="text-[9px] sm:text-[10px] uppercase font-bold text-sky-600 tracking-wider">Jawaban Benar</span>
              <div className="text-xl sm:text-2xl font-bold text-slate-900">{results.score} / {results.total}</div>
            </div>
            <div className="glass rounded-2xl p-4 sm:p-5">
              <span className="text-[9px] sm:text-[10px] uppercase font-bold text-violet-600 tracking-wider">Persentase</span>
              <div className="text-xl sm:text-2xl font-bold text-violet-600">{results.percentage}%</div>
            </div>
            <div className={`glass rounded-2xl p-4 sm:p-5 border-${iqColor}-200 bg-${iqColor}-50`}>
              <span className={`text-[9px] sm:text-[10px] uppercase font-bold text-${iqColor}-600 tracking-wider`}>Estimasi IQ</span>
              <div className={`text-xl sm:text-2xl font-bold text-${iqColor}-600`}>{results.iq}</div>
            </div>
          </div>

          {/* IQ Label */}
          <div className={`glass rounded-2xl p-4 sm:p-5 mb-6 border-${iqColor}-200 bg-${iqColor}-50/50 text-center`}>
            <div className="flex items-center justify-center gap-2 mb-1">
              <Zap className={`w-4 h-4 text-${iqColor}-500`} />
              <span className={`text-sm font-bold text-${iqColor}-700`}>{results.label}</span>
            </div>
            <p className="text-xs text-slate-600">{results.desc}</p>
          </div>

          {/* Category Breakdown */}
          {results.categoryDetails && results.categoryDetails.length > 0 && (
            <div className="mb-8">
              <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Performa per Kategori</h4>
              <div className="space-y-2">
                {results.categoryDetails.map((cat, i) => (
                  <div key={i} className="glass rounded-xl p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <TrendingUp className={`w-4 h-4 ${cat.percentage >= 70 ? 'text-emerald-500' : cat.percentage >= 40 ? 'text-amber-500' : 'text-rose-500'}`} />
                      <span className="text-xs font-semibold text-slate-700">{cat.category}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${cat.percentage >= 70 ? 'bg-emerald-500' : cat.percentage >= 40 ? 'bg-amber-500' : 'bg-rose-500'}`}
                          style={{ width: `${cat.percentage}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-600 w-16 text-right">{cat.correct}/{cat.total} ({cat.percentage}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button onClick={() => navigate(`/review/${results._id || 'recent'}`)} className="w-full py-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold transition-all shadow-lg shadow-sky-600/20 mb-3">
            Review Jawaban & Pembahasan
          </button>
          
          <button onClick={() => navigate('/dashboard')} className="w-full py-3 rounded-xl glass glass-hover text-slate-700 font-bold transition-all border border-slate-200">
            Kembali ke Dashboard
          </button>
        </motion.div>
      </div>
    );
  }

  if (!questions || questions.length === 0) return (
    <div className="min-h-screen flex items-center justify-center text-slate-400">
      Gagal memuat soal. Silakan coba lagi.
    </div>
  );

  const q = questions[idx];
  if (!q && !loading) {
    // If somehow we have no question and we aren't loading, clear session to prevent permanent lock
    sessionStorage.removeItem('quiz_session');
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
        <AlertCircle className="w-16 h-16 text-rose-500 mb-4" />
        <h2 className="text-xl font-bold text-slate-900 mb-2">Sesi Kuis Terganggu</h2>
        <p className="text-slate-500 mb-6 max-w-sm">Mohon maaf, terjadi kesalahan saat memuat soal. Sesi Anda telah direset.</p>
        <button onClick={() => { window.location.href = '/dashboard'; }} className="px-6 py-3 bg-sky-600 text-white rounded-xl font-bold">Kembali ke Dashboard</button>
      </div>
    );
  } else if (!q) {
    return null; // Should be handled by loading spinner, but just in case
  }

  const meta = categoryMeta[q.conceptName] || { icon: Brain, color: 'sky', category: 'Umum' };

  return (
    <div className="min-h-screen flex flex-col pt-4 sm:pt-8 bg-slate-50 text-slate-700 px-4 sm:px-6">
      {/* ── Progress Header ────────────────────────────────── */}
      <div className="max-w-4xl mx-auto w-full mb-6 sm:mb-8">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setShowExitConfirm(true)} className="flex items-center gap-2 text-[10px] sm:text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Keluar Sesi
          </button>
          <div className="text-[10px] sm:text-xs font-bold text-sky-600 uppercase tracking-widest">Soal {idx + 1} dari {TOTAL_QUESTIONS}</div>
        </div>
        <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
          <motion.div initial={{ width: 0 }} animate={{ width: `${((idx + 1) / TOTAL_QUESTIONS) * 100}%` }} className="h-full bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.5)]" />
        </div>
      </div>

      <div className="flex-1 max-w-4xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 pb-12">
        {/* ── Question Card ───────────────────────────────── */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div key={idx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-strong gradient-border rounded-2xl sm:rounded-3xl p-6 sm:p-10 min-h-[280px] sm:min-h-[320px] flex flex-col">
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <div className={`p-2 rounded-lg bg-${meta.color}-50 border border-${meta.color}-200`}>
                <meta.icon className={`w-4 h-4 sm:w-5 sm:h-5 text-${meta.color}-500`} />
              </div>
              <div>
                <div className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-wider">{meta.category}</div>
                <div className="text-xs sm:text-sm font-bold text-slate-900">{q.conceptName}</div>
              </div>
            </div>

            <h3 className="text-lg sm:text-2xl font-bold text-slate-900 leading-snug mb-8 flex-1">
              {q.content}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-auto">
              {q.options.map((opt, i) => (
                <button 
                  key={i} 
                  onClick={() => setSelected(opt)} 
                  className={`p-4 rounded-xl text-left text-sm font-semibold transition-all border ${selected === opt ? 'bg-sky-500 border-sky-400 text-white shadow-lg shadow-sky-600/20' : 'glass glass-hover text-slate-700'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>

          <button 
            onClick={handleSubmit} 
            disabled={selected === null} 
            className={`w-full py-4 sm:py-5 rounded-2xl flex items-center justify-center gap-2 font-bold transition-all text-sm sm:text-base ${selected !== null ? 'bg-sky-600 hover:bg-sky-500 text-white shadow-xl shadow-sky-600/20' : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'}`}
          >
            Konfirmasi Jawaban <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* ── Sidebar (Mobile-adaptive) ────────────────────── */}
        <div className="space-y-4">
          {/* Timer Card */}
          <div className="glass rounded-2xl p-5 sm:p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock className={`w-4 h-4 sm:w-5 sm:h-5 ${timer < 15 ? 'text-rose-500 animate-pulse' : 'text-sky-500'}`} />
              <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Sisa Waktu</span>
            </div>
            <span className={`text-xl sm:text-2xl font-mono font-bold ${timer < 15 ? 'text-rose-500' : 'text-slate-900'}`}>0:{timer.toString().padStart(2, '0')}</span>
          </div>



          {/* AI Info Card */}
          <div className={`glass rounded-2xl p-5 sm:p-6 border transition-all ${isAiActive ? 'border-emerald-200 bg-emerald-50' : 'border-slate-200 opacity-60'}`}>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className={`w-4 h-4 ${isAiActive ? 'text-emerald-500' : 'text-slate-500'}`} />
              <span className={`text-[10px] font-bold uppercase tracking-wider ${isAiActive ? 'text-emerald-600' : 'text-slate-500'}`}>
                Agen AI {isAiActive ? 'Aktif' : 'Nonaktif'}
              </span>
            </div>
            <p className="text-[10px] text-slate-600 leading-relaxed">
              {isAiActive 
                ? 'Agen Coach akan memberikan bantuan petunjuk jika Anda kesulitan menjawab soal.' 
                : 'Analisis agen dinamis dinonaktifkan. Selesaikan tes secara mandiri.'}
            </p>
          </div>

          {/* Nudge from Agent Coach */}
          <AnimatePresence mode="wait">
            {isAiActive && nudge && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="glass-strong gradient-border rounded-2xl p-5 sm:p-6 border-amber-200 bg-amber-50">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 rounded-md bg-amber-100"><Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500" /></div>
                  <span className="text-[10px] sm:text-xs font-bold text-amber-600 uppercase tracking-wider">Agen Coach</span>
                </div>
                <p className="text-[11px] sm:text-xs text-amber-800 leading-relaxed italic">"{nudge.message}"</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="glass rounded-2xl p-5 sm:p-6 hidden lg:block">
            <h4 className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Metodologi IQ</h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">Soal diacak untuk menguji kecerdasan cair dan pengenalan pola. Hasil Anda memperbarui profil kemahiran global Anda.</p>
          </div>
        </div>
      </div>

      <AgentTutorModal recommendation={recommendation} onClose={handleRecommendationClose} />

      {/* Exit Confirm Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
          <div className="glass-strong gradient-border rounded-2xl p-8 max-w-sm w-full text-center">
            <AlertCircle className="w-10 h-10 sm:w-12 sm:h-12 text-rose-500 mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">Akhiri Sesi?</h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-6">Progres Anda untuk kuis ini akan hilang.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowExitConfirm(false)} className="flex-1 py-3 rounded-xl glass glass-hover text-slate-700 text-sm font-bold">Batal</button>
              <button onClick={() => { sessionStorage.removeItem('quiz_session'); navigate('/dashboard'); }} className="flex-1 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-sm font-bold shadow-lg shadow-rose-500/20">Keluar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
