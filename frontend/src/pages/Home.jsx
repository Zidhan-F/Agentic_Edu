import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BrainCircuit, Cpu, Target, ArrowRight, Zap,
  BookOpen, Users, BarChart3, Shield, Star
} from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }
});

const features = [
  {
    icon: Target,
    color: 'sky',
    title: 'The Strategist',
    desc: 'Jalur pembelajaran adaptif yang berkembang berdasarkan skor penguasaan Anda, secara otomatis mengalihkan fokus ke area terlemah.'
  },
  {
    icon: BrainCircuit,
    color: 'teal',
    title: 'The Coach',
    desc: 'Dorongan real-time saat Anda kesulitan dan intervensi terjadwal untuk melindungi streak belajar Anda.'
  },
  {
    icon: Cpu,
    color: 'blue',
    title: 'The Tutor',
    desc: 'Rekomendasi sumber daya berbasis konteks yang dipicu pada setiap kesalahan — seperti memiliki mentor pribadi.'
  }
];

const stats = [
  { value: '100', label: 'Soal IQ', icon: BookOpen },
  { value: '5', label: 'Kategori', icon: BarChart3 },
  { value: '3', label: 'Agen AI', icon: BrainCircuit },
  { value: '24/7', label: 'Monitoring', icon: Shield },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="space-y-0 w-full overflow-hidden">
      {/* ══ Hero ═══════════════════════════════════════════════ */}
      <section className="relative pt-12 sm:pt-24 pb-20 sm:pb-32">
        {/* Background orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[900px] h-[600px] pointer-events-none opacity-50 sm:opacity-100">
          <div className="absolute top-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-sky-600/15 rounded-full blur-[80px] sm:blur-[100px] animate-float" />
          <div className="absolute bottom-0 right-0 w-64 sm:w-80 h-64 sm:h-80 bg-teal-600/12 rounded-full blur-[80px] sm:blur-[100px] animate-float" style={{ animationDelay: '3s' }} />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center px-4">
          <motion.div {...fadeUp(0)}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-[10px] sm:text-xs font-semibold tracking-wide uppercase text-sky-300 mb-6 sm:mb-8">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Asesmen Dinamis & Pembelajaran Adaptif
            </div>
          </motion.div>

          <motion.h1 {...fadeUp(0.08)} className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6">
            Buka Potensi
            <br />
            <span className="gradient-text">Kognitif Anda</span>
          </motion.h1>

          <motion.p {...fadeUp(0.16)} className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto mb-10 leading-relaxed">
            Ikuti asesmen IQ adaptif kami yang ditenagai oleh tiga agen cerdas yang menganalisis, membimbing, dan mengajar — menciptakan pengalaman belajar pribadi yang berkembang bersama Anda.
          </motion.p>

          <motion.div {...fadeUp(0.24)} className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigate('/quiz')}
              className="w-full sm:w-auto group flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold shadow-lg shadow-sky-600/20 hover:shadow-sky-500/30 transition-all"
            >
              Mulai Tes IQ
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl glass glass-hover text-slate-700 font-semibold"
            >
              Lihat Dashboard
            </button>
          </motion.div>
        </div>
      </section>

      {/* ══ Stats Bar ═════════════════════════════════════════ */}
      <section className="py-12 border-y border-slate-200">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-4">
          {stats.map((s, i) => (
            <motion.div key={i} {...fadeUp(i * 0.06)} viewport={{ once: true }} whileInView="animate" initial="initial" className="text-center">
              <s.icon className="w-5 h-5 text-sky-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-900">{s.value}</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ Features ══════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 {...fadeUp()} viewport={{ once: true }} whileInView="animate" initial="initial" className="text-3xl font-bold text-slate-900 mb-3">
            Tiga Agen, Satu Tujuan
          </motion.h2>
          <motion.p {...fadeUp(0.08)} viewport={{ once: true }} whileInView="animate" initial="initial" className="text-slate-600 max-w-lg mx-auto">
            Heuristic engine kami menggerakkan tiga agen AI berbeda yang bekerja sama untuk mengoptimalkan perjalanan belajar Anda.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-strong gradient-border rounded-2xl p-7 group cursor-default"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-${f.color}-50 border border-${f.color}-200`}>
                <f.icon className={`w-6 h-6 text-${f.color}-500`} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{f.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ How It Works ══════════════════════════════════════ */}
      <section className="py-20 sm:py-24 border-t border-slate-200 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">Cara Kerja</h2>
          <p className="text-slate-600 max-w-lg mx-auto">Alur 4 langkah yang mulus dari asesmen hingga penguasaan.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { step: '01', title: 'Ikuti Asesmen', desc: 'Jawab 20 soal IQ adaptif dari bank soal berisi 100 pertanyaan kami.', icon: BookOpen },
            { step: '02', title: 'Analisis Agen', desc: 'Strategist kami menganalisis kekuatan dan kelemahan Anda secara real-time.', icon: BarChart3 },
            { step: '03', title: 'Dibimbing', desc: 'Coach memberikan petunjuk saat Anda kesulitan — tanpa rasa frustrasi.', icon: Users },
            { step: '04', title: 'Belajar & Tumbuh', desc: 'Tutor merekomendasikan sumber daya yang tepat untuk menutup celah pengetahuan Anda.', icon: Star },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 relative overflow-hidden group glass-hover"
            >
              <span className="text-5xl font-black text-slate-900/[0.03] absolute top-4 right-4 group-hover:text-slate-900/[0.06] transition-colors">{item.step}</span>
              <item.icon className="w-5 h-5 text-sky-500 mb-4" />
              <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ CTA ═══════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 px-4">
        <div className="max-w-2xl mx-auto text-center glass-strong gradient-border rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-teal-500/10 pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Siap Menguji IQ Anda?</h2>
            <p className="text-slate-600 mb-8">Bank soal isi 100 pertanyaan. 20 soal adaptif per tes. 3 agen AI yang membimbing Anda.</p>
            <button
              onClick={() => navigate('/quiz')}
              className="group flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold mx-auto shadow-lg shadow-sky-600/20 hover:shadow-sky-500/30 transition-all w-full sm:w-auto"
            >
              Mulai Asesmen
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
