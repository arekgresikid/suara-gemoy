import React from 'react';
import { X, Sparkles, Mic2, Zap, Star, ShieldCheck } from 'lucide-react';

const WelcomeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="glass-card max-w-lg w-full rounded-[3rem] border border-zinc-800 p-8 relative overflow-hidden shadow-[0_0_50px_rgba(250,204,21,0.1)]">
        
        {/* Background Accents */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-400/10 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-yellow-400/10 blur-3xl rounded-full translate-x-1/2 translate-y-1/2" />

        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-zinc-500 hover:text-white p-2 hover:bg-zinc-800 rounded-full transition-all active:scale-90"
        >
          <X size={20} />
        </button>

        <div className="text-center space-y-6 pt-4">
          <div className="w-20 h-20 bg-yellow-400 text-black rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl shadow-yellow-400/20 rotate-3 animate-float">
            <Sparkles size={40} />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-3xl font-black tracking-tighter uppercase italic">Welcome to <span className="text-yellow-400">Suara Gemoy</span></h2>
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em]">RuangRiung Vocal Engine v2.0</p>
          </div>

          <div className="grid grid-cols-1 gap-4 text-left">
            <div className="bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800 flex items-center gap-4 group hover:border-yellow-400/50 transition-all">
              <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-yellow-400">
                <Mic2 size={20} />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase text-white">Premium ElevenLabs</h4>
                <p className="text-[10px] text-zinc-500">Akses koleksi suara paling realistis di dunia.</p>
              </div>
            </div>

            <div className="bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800 flex items-center gap-4 group hover:border-yellow-400/50 transition-all">
              <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-yellow-400">
                <Zap size={20} />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase text-white">Advanced AI Naskah</h4>
                <p className="text-[10px] text-zinc-500">Pilih model OpenAI, Claude, hingga Llama.</p>
              </div>
            </div>

            <div className="bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800 flex items-center gap-4 group hover:border-yellow-400/50 transition-all">
              <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-yellow-400">
                <Star size={20} />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase text-white">Preset Gaya Bicara</h4>
                <p className="text-[10px] text-zinc-500">Gaya centil, berita, hingga sedih dalam satu klik.</p>
              </div>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-full py-5 bg-yellow-400 text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-yellow-300 transition-all active:scale-95 shadow-xl shadow-yellow-400/10 flex items-center justify-center gap-2"
          >
            <ShieldCheck size={18} /> MULAI BERKARYA SEKARANG
          </button>
          
          <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">Powered by RuangRiung Collaboration</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
