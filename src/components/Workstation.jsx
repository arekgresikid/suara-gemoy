import React from 'react';
import { Wand2, PenTool, RefreshCw, Sparkles, Loader2, Mic, Play, Pause, Download, AlertCircle } from 'lucide-react';
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
    <div className="lg:col-span-8 space-y-6">
      <div className="bg-zinc-900 p-8 rounded-[3rem] shadow-2xl border border-zinc-800 flex flex-col flex-1 min-h-[700px]">
        
        {/* 1. PEMILIHAN GAYA */}
        <div className="mb-6">
           <label className="text-[9px] font-black text-zinc-500 uppercase mb-4 block tracking-widest">Pilih Gaya Karakter:</label>
           <div className="flex gap-2 overflow-x-auto pb-4 custom-scrollbar">
            {styles.map(s => (
              <button
                key={s.id}
                onClick={() => setStyle(s.id)}
                className={`flex items-center gap-3 px-6 py-4 rounded-2xl whitespace-nowrap text-[10px] font-black transition-all border uppercase tracking-widest ${
                  style === s.id ? 'bg-yellow-400 text-black border-yellow-400 shadow-xl scale-105' : 'bg-zinc-800 text-zinc-500 border-zinc-700 hover:bg-zinc-700'
                }`}
              >
                {s.icon} {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2. TULIS SCRIPT */}
        <div className="bg-black/50 p-4 rounded-[2rem] border border-zinc-800 flex flex-col md:flex-row gap-4 items-center mb-8">
          <div className="bg-yellow-400 p-3 rounded-2xl text-black shadow-xl">
            <Wand2 size={24} />
          </div>
          <input 
            className="bg-transparent border-b border-zinc-800 flex-1 p-2 text-white font-bold placeholder:text-zinc-700 outline-none text-sm"
            placeholder="Apa topik konten kamu hari ini?"
            value={topic}
            onChange={e => setTopic(e.target.value)}
          />
          <button 
            onClick={handleGenerateScript} 
            disabled={aiLoading} 
            className="bg-yellow-400 hover:bg-yellow-300 text-black px-8 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-yellow-400/10"
          >
            {aiLoading ? <RefreshCw className="animate-spin" size={14} /> : <PenTool size={14} />}
            Generate Naskah AI
          </button>
        </div>

        {/* 3. WORKSPACE AREA */}
        <div className="flex-1 relative mb-6">
          <textarea
            className="w-full h-full p-8 text-2xl font-black bg-black rounded-[2.5rem] border-2 border-zinc-800 focus:border-yellow-400/20 outline-none resize-none placeholder:text-zinc-800 leading-relaxed custom-scrollbar shadow-inner"
            placeholder="Masukkan naskah di sini..."
            value={text}
            onChange={e => setText(e.target.value)}
          />
          {text && (
            <button 
              onClick={handleFixScript} 
              disabled={aiLoading} 
              className="absolute bottom-6 right-6 bg-zinc-900 border border-zinc-700 text-yellow-400 px-6 py-3 rounded-full text-[10px] font-black flex items-center gap-2 hover:bg-yellow-400 hover:text-black transition-all shadow-xl active:scale-90"
            >
              <Sparkles size={14} /> SEMPURNAKAN SCRIPT
            </button>
          )}
        </div>

        {/* 4. PLAYER & MAIN TRIGGER */}
        <div className="space-y-6">
          {audioUrl && (
            <div className="bg-black p-6 rounded-[2.5rem] border border-zinc-800 flex flex-col gap-3 shadow-lg">
              <div className="flex items-center gap-5">
                <button onClick={togglePlay} className="w-16 h-16 bg-yellow-400 text-black rounded-2xl flex items-center justify-center hover:bg-yellow-300 shadow-xl active:scale-90 transition-all">
                  {isPlaying ? <Pause fill="currentColor" size={28} /> : <Play fill="currentColor" size={28} className="ml-1" />}
                </button>
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between text-[10px] font-black text-zinc-600 uppercase tracking-widest">
                    <span>{formatTime(currentTime)}</span>
                    <span className="text-yellow-400/50">{formatTime(duration)}</span>
                  </div>
                  <input type="range" min="0" max={duration || 0} value={currentTime} onChange={handleSeek} className="w-full accent-yellow-400 h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer" />
                </div>
                <a href={audioUrl} download="SuaraGemoy_RuangRiung.wav" className="p-5 bg-zinc-800 text-yellow-400 rounded-2xl border border-zinc-700 hover:bg-zinc-700 transition-all">
                  <Download size={24} />
                </a>
              </div>
              <audio ref={audioRef} src={audioUrl} autoPlay />
            </div>
          )}

          <button
            onClick={generateSpeech}
            disabled={loading}
            className={`w-full py-8 rounded-[2.5rem] font-black text-[12px] tracking-[0.4em] uppercase flex items-center justify-center gap-4 transition-all border-b-8 border-black shadow-2xl ${
              loading ? 'bg-zinc-800 text-zinc-600 border-zinc-900 cursor-not-allowed' : 'bg-yellow-400 text-black hover:bg-yellow-300 active:translate-y-1 active:border-b-0'
            }`}
          >
            {loading ? <Loader2 className="animate-spin" /> : <Mic size={20} />}
            {loading ? 'SUTRADARA LAGI REKAMAN...' : 'GENERATE SUARA GEMOY'}
          </button>
        </div>

        {error && (
          <div className="mt-4 p-5 bg-red-950/20 text-red-400 text-[10px] font-black rounded-2xl flex items-center gap-3 border border-red-900/50 animate-pulse">
            <AlertCircle size={16}/> {error.toUpperCase()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Workstation;
