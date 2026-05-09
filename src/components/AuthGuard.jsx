import React, { useState, useEffect } from 'react';
import { Lock, ShieldCheck, AlertCircle, KeyRound } from 'lucide-react';

const AuthGuard = ({ children }) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const APP_PASSWORD = import.meta.env.VITE_APP_PASSWORD;

  useEffect(() => {
    const authStatus = localStorage.getItem('is_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === APP_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('is_authenticated', 'true');
      setError(false);
    } else {
      setError(true);
      setPassword('');
      // Shake animation effect could be added here
    }
  };

  if (isLoading) return null;

  if (isAuthenticated) {
    return children;
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black font-sans">
      {/* Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-yellow-400/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-yellow-400/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="glass-card p-8 rounded-[2.5rem] border border-zinc-800 shadow-2xl relative overflow-hidden">
          {/* Top Icon */}
          <div className="w-20 h-20 bg-yellow-400 text-black rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(250,204,21,0.3)] rotate-3 animate-float">
            <Lock size={40} />
          </div>

          <div className="text-center space-y-2 mb-8">
            <h2 className="text-3xl font-black tracking-tighter uppercase italic">Protected <span className="text-yellow-400">Access</span></h2>
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em]">RuangRiung Secure Gateway</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-yellow-400 transition-colors">
                <KeyRound size={18} />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="ENTER PASSWORD"
                className={`w-full bg-zinc-900/50 border-2 ${error ? 'border-red-500/50 animate-shake' : 'border-zinc-800 focus:border-yellow-400'} py-5 pl-14 pr-6 rounded-2xl text-xs font-black uppercase tracking-widest outline-none transition-all placeholder:text-zinc-700`}
                autoFocus
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-500 text-[10px] font-black uppercase tracking-wider justify-center animate-in fade-in slide-in-from-top-2">
                <AlertCircle size={14} />
                <span>Incorrect password. Please try again.</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-5 bg-yellow-400 text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-yellow-300 transition-all active:scale-95 shadow-xl shadow-yellow-400/10 flex items-center justify-center gap-3 group"
            >
              <ShieldCheck size={18} className="group-hover:scale-110 transition-transform" />
              AUTHENTICATE ACCESS
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-zinc-800/50 text-center">
            <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-[0.2em]">© 2024 RUANGRIUNG COLLABORATION</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
      `}</style>
    </div>
  );
};

export default AuthGuard;
