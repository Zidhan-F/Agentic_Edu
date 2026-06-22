import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { motion } from 'framer-motion';
import { BrainCircuit, ShieldCheck, ArrowRight } from 'lucide-react';

const API = 'http://localhost:5000/api';

export default function Login({ onLoginSuccess }) {
  const handleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(`${API}/auth/google`, {
        token: credentialResponse.credential,
      });
      if (res.data.success) {
        onLoginSuccess(res.data.user);
      }
    } catch (error) {
      console.error('Login Failed', error);
      alert('Autentikasi gagal. Silakan periksa konsol untuk detailnya.');
    }
  };

  const handleError = () => {
    console.error('Google Login Failed');
    alert('Gagal Masuk dengan Google');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md glass-strong gradient-border rounded-3xl p-8 sm:p-10 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-teal-500/10 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="bg-gradient-to-br from-sky-500 to-teal-500 p-4 rounded-2xl mb-6 shadow-[0_0_30px_rgba(14,165,233,0.3)]">
            <BrainCircuit className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2 tracking-tight">Selamat Datang di EduAgent</h2>
          <p className="text-slate-600 mb-8 text-xs sm:text-sm leading-relaxed">
            Silakan masuk dengan akun Google Anda untuk mengakses dashboard pribadi dan menyimpan progres asesmen kognitif Anda.
          </p>

          <div className="w-full glass rounded-2xl p-5 sm:p-6 mb-8 flex flex-col gap-4 text-left">
            <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700">
              <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
              <span>Autentikasi aman</span>
            </div>
            <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700">
              <ArrowRight className="w-5 h-5 text-sky-500 shrink-0" />
              <span>Pantau skor kemahiran Anda</span>
            </div>
          </div>

          <div className="w-full flex justify-center">
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={handleError}
              theme="outline"
              shape="pill"
              size="large"
              width="100%"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
