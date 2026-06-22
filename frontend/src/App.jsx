import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import QuizSession from './pages/QuizSession';
import LearningMaterial from './pages/LearningMaterial';
import Login from './pages/Login';
import QuizReview from './pages/QuizReview';
import { BrainCircuit, Sparkles, LogOut, Menu, X, ToggleLeft, ToggleRight } from 'lucide-react';

function NavLink({ to, children, onClick }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`text-sm font-medium transition-colors relative py-2 sm:py-1 ${
        isActive
          ? 'text-sky-600 after:hidden md:after:absolute md:after:bottom-0 md:after:left-0 md:after:right-0 md:after:h-px md:after:bg-sky-500 bg-slate-100 md:bg-transparent px-3 md:px-0 rounded-lg md:rounded-none'
          : 'text-slate-500 hover:text-slate-900 px-3 md:px-0'
      }`}
    >
      {children}
    </Link>
  );
}

function AppShell({ user, onLogout, onLoginSuccess, isAiActive, setIsAiActive }) {
  const location = useLocation();
  const isQuiz = location.pathname === '/quiz' || location.pathname.startsWith('/review');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen font-sans flex flex-col">
      {/* ── Header ────────────────────────────────────────── */}
      {!isQuiz && (
        <header className="glass border-b border-slate-200 sticky top-0 z-40 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="bg-gradient-to-br from-sky-500 to-teal-500 p-1.5 rounded-lg group-hover:shadow-[0_0_16px_rgba(14,165,233,0.3)] transition-shadow duration-300">
                <BrainCircuit className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900">
                Agentic<span className="text-sky-600">Edu</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              <NavLink to="/">Beranda</NavLink>
              {user && <NavLink to="/dashboard">Dashboard</NavLink>}
              
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsAiActive(!isAiActive)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all ${
                    isAiActive 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-600' 
                    : 'bg-slate-100 border-slate-200 text-slate-500'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isAiActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">AI {isAiActive ? 'Aktif' : 'Nonaktif'}</span>
                  {isAiActive ? <ToggleRight className="w-4 h-4 ml-1" /> : <ToggleLeft className="w-4 h-4 ml-1" />}
                </button>
                
                {user ? (
                  <button 
                    onClick={onLogout}
                    className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Keluar
                  </button>
                ) : (
                  <Link 
                    to="/login"
                    className="text-sm font-semibold text-white bg-sky-600 hover:bg-sky-500 px-5 py-2 rounded-xl transition-all shadow-lg shadow-sky-600/20"
                  >
                    Masuk
                  </Link>
                )}
              </div>
            </nav>

            {/* Mobile Menu Toggle */}
            <div className="flex items-center gap-3 md:hidden">
               {/* AI Toggle for mobile (icon only or small) */}
               <button 
                  onClick={() => setIsAiActive(!isAiActive)}
                  className={`p-2 rounded-lg border transition-all ${
                    isAiActive 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-600' 
                    : 'bg-slate-100 border-slate-200 text-slate-500'
                  }`}
                >
                   <Sparkles className={`w-4 h-4 ${isAiActive ? 'animate-pulse' : ''}`} />
                </button>

              <button 
                className="p-2 text-slate-600 glass rounded-lg"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Nav Dropdown */}
          {isMobileMenuOpen && (
            <div className="md:hidden glass-strong border-b border-slate-200 p-4 flex flex-col gap-2 absolute top-full left-0 w-full z-50 animate-in fade-in slide-in-from-top-2">
              <NavLink to="/">Beranda</NavLink>
              {user && <NavLink to="/dashboard">Dashboard</NavLink>}
              <div className="h-px bg-slate-200 my-2" />
              {user ? (
                <button 
                  onClick={onLogout}
                  className="flex items-center gap-3 p-3 text-sm font-medium text-slate-600 hover:text-slate-900"
                >
                  <LogOut className="w-4 h-4" /> Keluar
                </button>
              ) : (
                <Link to="/login" className="w-full py-3 bg-sky-600 hover:bg-sky-500 rounded-xl text-center font-bold text-white shadow-lg shadow-sky-500/20">
                  Masuk
                </Link>
              )}
            </div>
          )}
        </header>
      )}

      {/* ── Main ──────────────────────────────────────────── */}
      <main className={`flex-1 overflow-x-hidden ${isQuiz ? '' : 'max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-10'}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login onLoginSuccess={onLoginSuccess} />} />
          <Route 
            path="/dashboard" 
            element={user ? <Dashboard user={user} isAiActive={isAiActive} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/quiz" 
            element={user ? <QuizSession user={user} isAiActive={isAiActive} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/review/:id" 
            element={user ? <QuizReview user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/learning/:id" 
            element={user ? <LearningMaterial /> : <Navigate to="/login" />} 
          />
        </Routes>
      </main>

      {/* ── Footer ────────────────────────────────────────── */}
      {!isQuiz && (
        <footer className="border-t border-slate-200 py-10 px-4 sm:px-6 mt-auto">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-xs sm:text-sm text-slate-500 text-center md:text-left">
            <div className="space-y-1">
              <div className="font-bold text-slate-900 flex items-center justify-center md:justify-start gap-2 mb-2">
                 <BrainCircuit className="w-4 h-4 text-sky-500" /> AgenticEdu
              </div>
              <span>© 2026 AgenticEdu. Hak Cipta Dilindungi.</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="#" className="hover:text-slate-800 transition-colors">Kebijakan Privasi</a>
              <a href="#" className="hover:text-slate-800 transition-colors">Syarat & Ketentuan</a>
              <a href="#" className="hover:text-slate-800 transition-colors">Kontak</a>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('agentic_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isAiActive, setIsAiActive] = useState(true);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('agentic_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('agentic_user');
  };

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID_HERE';

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <BrowserRouter>
        <AppShell 
          user={user} 
          isAiActive={isAiActive}
          setIsAiActive={setIsAiActive}
          onLoginSuccess={handleLoginSuccess} 
          onLogout={handleLogout} 
        />
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}
