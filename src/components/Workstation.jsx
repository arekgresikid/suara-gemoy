import React from 'react';
import { Wand2, PenTool, RefreshCw, Sparkles, Loader2, Mic, Play, Pause, Download, AlertCircle, Terminal, Music2 } from 'lucide-react';
import { styles } from '../constants/data';

const Workstation = ({
  style, setStyle,
  topic, setTopic,
  text, setText,
  handleGenerateScript,
  handleFixScript,
  generateSpeech,
  aiLoading,
  loading,
  audioUrl,
  isPlaying,
  togglePlay,
  currentTime,
  duration,
  handleSeek,
  formatTime,
  error,
  audioRef
}) => {
  return (
    <div className="lg:col-span-8 space-y-8">
      {/* HEADER INFO */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
            <Terminal size={24} className="text-yellow-400" />
            Vocal Station <span className="text-zinc-600">v2.0</span>
          </h2>
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em]">Tulis naskah, pilih gaya, dan hasilkan suara otomatis.</p>
        </div>
        <div className="flex items-center gap-3 bg-zinc-900/50 p-2 rounded-2xl border border-zinc-800">
           <div className="flex -space-x-2">
              {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-zinc-900 bg-zinc-800 flex items-center justify-center text-[8px] font-black text-zinc-500">{i}</div>)}
           </div>
           <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest pr-2">3 Steps Workflow</span>
        </div>
      </div>

      <div className={`glass-card p-10 rounded-[3.5rem] border transition-all duration-700 flex flex-col flex-1 min-h-[850px] relative overflow-hidden ${
        loading || aiLoading ? 'border-yellow-400/40 shadow-[0_0_50px_rgba(250,204,21,0.1)]' : 'border-zinc-800/50'
      }`}>
        
        {/* TOP LOADING BAR (Integrated) */}
        {(loading || aiLoading) && (
          <div className="absolute top-0 left-0 right-0 h-1 z-[60] overflow-hidden bg-zinc-900">
            <div className="h-full bg-yellow-400 animate-[marquee_1.5s_linear_infinite]" style={{ width: '40%' }} />
          </div>
        )}
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-400/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="mb-10 relative z-10 space-y-4">
           <label className="text-[10px] font-black text-zinc-500 uppercase block tracking-[0.2em] ml-1 flex items-center gap-2">
             <Sparkles size={14} className="text-yellow-400" /> Pilih Vibe & Gaya Bicara:
           </label>
           <div className="relative group">
             <select 
               value={style} 
               onChange={e => setStyle(e.target.value)}
               className="w-full bg-black/40 border-2 border-zinc-800 rounded-[2rem] p-6 text-lg font-black outline-none focus:border-yellow-400/50 transition-all text-yellow-400 appearance-none cursor-pointer shadow-xl"
             >
               {styles.map(s => (
                 <option key={s.id} value={s.id} className="bg-zinc-900 text-white">
                   {s.label}
                 </option>
               ))}
             </select>
             <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500 group-focus-within:text-yellow-400 transition-colors">
               <RefreshCw size={20} />
             </div>
           </div>
        </div>

        {/* 2. TOPIC INPUT */}
        <div className="bg-black/60 p-6 rounded-[2.5rem] border border-zinc-800/50 flex flex-col md:flex-row gap-6 items-center mb-10 group transition-all hover:border-zinc-700 relative z-10">
          <div className="w-16 h-16 bg-yellow-400 text-black rounded-2xl flex items-center justify-center shadow-xl shadow-yellow-400/20 shrink-0">
            <Wand2 size={32} />
          </div>
          <div className="flex-1 w-full space-y-1">
            <label className="text-[9px] font-black text-zinc-600 uppercase tracking-widest block ml-1">Input Ide Konten</label>
            <input 
              className="bg-transparent w-full p-1 text-xl font-bold text-white placeholder:text-zinc-800 outline-none border-b-2 border-zinc-800/50 focus:border-yellow-400 transition-all"
              placeholder="Contoh: Tutorial masak mie instan ala anak kost..."
              value={topic}
              onChange={e => setTopic(e.target.value)}
            />
          </div>
          <button 
            onClick={handleGenerateScript} 
            disabled={aiLoading} 
            className="w-full md:w-auto bg-white hover:bg-yellow-400 text-black px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {aiLoading ? <RefreshCw className="animate-spin" size={16} /> : <PenTool size={16} className="group-hover:rotate-12 transition-transform" />}
            Minta Naskah AI
          </button>
        </div>

        {/* 3. TEXTAREA AREA */}
        <div className="flex-1 relative mb-10 z-10">
          <div className="absolute top-6 left-6 flex items-center gap-2 pointer-events-none">
             <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
             <span className="text-[9px] font-black text-zinc-700 uppercase tracking-widest">Digital Recording Buffer</span>
          </div>
          <textarea
            className="w-full h-full p-12 pt-16 text-2xl font-black bg-black/40 rounded-[3rem] border-2 border-zinc-800/50 focus:border-yellow-400/20 outline-none resize-none placeholder:text-zinc-800 leading-relaxed custom-scrollbar shadow-inner text-white transition-all"
            placeholder="Ketik atau generate naskah di sini..."
            value={text}
            onChange={e => setText(e.target.value)}
          />
          {text && (
            <button 
              onClick={handleFixScript} 
              disabled={aiLoading} 
              className="absolute bottom-8 right-8 bg-zinc-900/90 backdrop-blur border border-zinc-700 text-yellow-400 px-8 py-4 rounded-full text-[11px] font-black flex items-center gap-3 hover:bg-yellow-400 hover:text-black transition-all shadow-2xl active:scale-90"
            >
              <Sparkles size={16} /> SEMPURNAKAN SCRIPT
            </button>
          )}
        </div>

        {/* 4. PLAYER & TRIGGER */}
        <div className="space-y-8 relative z-10">
          {audioUrl && (
            <div className="bg-gradient-to-br from-zinc-900 to-black p-8 rounded-[3rem] border border-zinc-800 flex flex-col gap-6 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-6">
                <button 
                  onClick={togglePlay} 
                  className="w-20 h-20 bg-yellow-400 text-black rounded-[2rem] flex items-center justify-center hover:bg-yellow-300 shadow-[0_15px_35px_rgba(250,204,21,0.4)] active:scale-90 transition-all group"
                >
                  {isPlaying ? <Pause fill="currentColor" size={36} /> : <Play fill="currentColor" size={36} className="ml-1 group-hover:scale-110 transition-transform" />}
                </button>
                <div className="flex-1 space-y-4">
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                       <span className="text-[10px] font-black text-yellow-400 uppercase tracking-[0.3em]">Master Audio Ready</span>
                       <h3 className="text-lg font-black tracking-tight flex items-center gap-2"><Music2 size={16} /> SuaraGemoy_Output.wav</h3>
                    </div>
                    <span className="text-[11px] font-black text-zinc-500 bg-zinc-800 px-3 py-1 rounded-full">{formatTime(currentTime)} / {formatTime(duration)}</span>
                  </div>
                  <div className="relative pt-2">
                    <input 
                      type="range" 
                      min="0" 
                      max={duration || 0} 
                      value={currentTime} 
                      onChange={handleSeek} 
                      className="w-full accent-yellow-400 h-2.5 bg-zinc-800 rounded-full appearance-none cursor-pointer relative z-10" 
                    />
                    <div className="absolute top-2 left-0 h-2.5 bg-yellow-400/20 rounded-full" style={{ width: `${(currentTime / duration) * 100}%` }} />
                  </div>
                </div>
                <a 
                  href={audioUrl} 
                  download="SuaraGemoy_RuangRiung.wav" 
                  className="p-6 bg-zinc-800 text-yellow-400 rounded-2xl border border-zinc-700 hover:bg-zinc-700 hover:text-white transition-all shadow-xl active:scale-95"
                  title="Download File"
                >
                  <Download size={28} />
                </a>
              </div>
              <audio ref={audioRef} src={audioUrl} autoPlay />
            </div>
          )}

          <button
            onClick={generateSpeech}
            disabled={loading}
            className={`w-full py-6 rounded-2xl font-black text-[12px] tracking-[0.3em] uppercase flex items-center justify-center gap-4 transition-all duration-300 border-b-4 border-black/20 shadow-xl relative overflow-hidden group ${
              loading 
                ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed opacity-50' 
                : 'bg-yellow-400 text-black hover:bg-yellow-300 active:translate-y-1 active:border-b-0 hover:shadow-yellow-400/20'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Mic size={20} className="group-hover:rotate-12 transition-transform" />}
            {loading ? 'MENYIAPKAN VOCAL...' : 'GENERATE SUARA SEKARANG'}
          </button>
        </div>

        {error && (
          <div className="mt-8 p-6 bg-red-950/20 text-red-400 text-[11px] font-black rounded-3xl flex items-center gap-4 border border-red-900/50 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center shrink-0">
               <AlertCircle size={20}/>
            </div>
            <p className="flex-1">{error.toUpperCase()}</p>
            <button onClick={() => setTopic('')} className="text-zinc-600 hover:text-red-400 transition-colors uppercase text-[9px] underline">Reset Input</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Workstation;
