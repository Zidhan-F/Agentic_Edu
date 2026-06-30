import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, ShieldCheck, ArrowRight, Mail, Lock, User, AlertCircle } from 'lucide-react';

import { API } from '../config';

export default function Login({ onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(`${API}/auth/google`, {
        token: credentialResponse.credential,
      });
      if (res.data.success) {
        onLoginSuccess(res.data.user);
      }
    } catch (error) {
      console.error('Google Login Failed', error);
      setErrorMsg('Autentikasi Google gagal. Silakan coba lagi.');
    }
  };

  const handleGoogleError = () => {
    console.error('Google Login Failed');
    setErrorMsg('Gagal masuk dengan Google');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      if (isSignUp) {
        // Register flow
        if (!name || !email || !password) {
          setErrorMsg('Semua kolom wajib diisi!');
          setLoading(false);
          return;
        }
        const res = await axios.post(`${API}/auth/register`, {
          name,
          email,
          password
        });
        if (res.data.success) {
          // Auto login on register success
          onLoginSuccess(res.data.user);
        }
      } else {
        // Login flow
        if (!email || !password) {
          setErrorMsg('Email dan password wajib diisi!');
          setLoading(false);
          return;
        }
        const res = await axios.post(`${API}/auth/login`, {
          email,
          password
        });
        if (res.data.success) {
          onLoginSuccess(res.data.user);
        }
      }
    } catch (error) {
      console.error('Auth Request Failed', error);
      const errMsg = error.response?.data?.error || 'Terjadi kesalahan sistem. Coba lagi nanti.';
      setErrorMsg(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white/70 backdrop-blur-xl border border-slate-200/50 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-teal-500/5 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="bg-gradient-to-br from-sky-500 to-teal-500 p-3.5 rounded-2xl mb-5 shadow-[0_0_25px_rgba(14,165,233,0.25)]">
            <BrainCircuit className="w-9 h-9 text-white" />
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-2 tracking-tight">
            {isSignUp ? 'Daftar Akun Baru' : 'Selamat Datang Kembali'}
          </h2>
          <p className="text-slate-500 mb-6 text-xs sm:text-sm text-center leading-relaxed">
            {isSignUp 
              ? 'Lengkapi form di bawah untuk mendaftarkan akun asesmen personal Anda.'
              : 'Masuk untuk mengakses dashboard belajar dan menyimpan hasil asesmen kognitif.'
            }
          </p>

          {/* Alert Message */}
          <AnimatePresence>
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs sm:text-sm flex items-center gap-2.5"
              >
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span className="font-medium">{errorMsg}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            {isSignUp && (
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-xs font-semibold text-slate-600 ml-1">Nama Lengkap</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Zidhan F."
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-800 text-sm transition-all"
                    required
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-xs font-semibold text-slate-600 ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-800 text-sm transition-all"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-xs font-semibold text-slate-600 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-800 text-sm transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 text-white font-bold text-sm sm:text-base shadow-lg shadow-sky-500/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-75 disabled:pointer-events-none"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>{isSignUp ? 'Daftar Sekarang' : 'Masuk Akun'}</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Toggle Login / SignUp */}
          <div className="mt-5 text-center">
            <p className="text-slate-500 text-xs sm:text-sm">
              {isSignUp ? 'Sudah memiliki akun?' : 'Belum memiliki akun?'}
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setErrorMsg('');
                }}
                className="text-sky-600 font-bold ml-1.5 hover:underline focus:outline-none"
              >
                {isSignUp ? 'Masuk' : 'Daftar di sini'}
              </button>
            </p>
          </div>

          {/* Separator */}
          <div className="w-full flex items-center gap-3 my-6">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Atau</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* Google Button */}
          <div className="w-full flex justify-center">
            <div className="w-full max-w-[280px]">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                theme="outline"
                shape="pill"
                size="large"
                width="100%"
              />
            </div>
          </div>

          {/* Additional Features List */}
          <div className="w-full border-t border-slate-100 mt-6 pt-5 flex items-center justify-center gap-6 text-slate-500 text-xs">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Akses Aman</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ArrowRight className="w-4 h-4 text-sky-500 shrink-0" />
              <span>Real-time Sync</span>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
