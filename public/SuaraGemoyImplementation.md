# Implementasi Suara Gemoy by RuangRiung

Berikut adalah kode React lengkap untuk aplikasi Suara Gemoy dengan desain Brutalist Modern:

```jsx
import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, Pause, Download, Wand2, Mic2, Smartphone, 
  Radio, Video, Volume2, Globe, Home, Building2, 
  Trees, Music, Info, Heart, Send, Sparkles, RefreshCcw
} from 'lucide-react';

// --- DATA MOCK (DATABASE LOKAL) ---
const voices = [
  { id: 'aoede', name: 'Aoede', tags: ['Centil', 'Energetik'] },
  { id: 'despina', name: 'Despina', tags: ['Lembut', 'Tenang'] },
  { id: 'callirrhoe', name: 'Callirrhoe', tags: ['Serius', 'Formal'] },
  { id: 'puck', name: 'Puck', tags: ['Ceria', 'Anak-anak'] },
  { id: 'zephyr', name: 'Zephyr', tags: ['Maskulin', 'Dalam'] },
  { id: 'titania', name: 'Titania', tags: ['Elegan', 'Dewasa'] },
  { id: 'oberon', name: 'Oberon', tags: ['Wibawa', 'Narasi'] },
  { id: 'ariel', name: 'Ariel', tags: ['Cepat', 'Fun'] },
  { id: 'miranda', name: 'Miranda', tags: ['Ramah', 'Sapaan'] },
  { id: 'caliban', name: 'Caliban', tags: ['Serak', 'Unik'] },
  { id: 'portia', name: 'Portia', tags: ['Tegas', 'Informatif'] },
  { id: 'cassio', name: 'Cassio', tags: ['Cool', 'Trendy'] },
  { id: 'lago', name: 'Lago', tags: ['Sinis', 'Akting'] },
  { id: 'desdemona', name: 'Desdemona', tags: ['Melankolis', 'Sedih'] },
  { id: 'ophelia', name: 'Ophelia', tags: ['Misterius', 'Bisikan'] },
  { id: 'hamlet', name: 'Hamlet', tags: ['Filosofis', 'Lambat'] }
];

const devices = [
  { id: 'studio_mic', label: 'Studio Mic', icon: <Mic2 size={16} /> },
  { id: 'hp_murah', label: 'HP Murah', icon: <Smartphone size={16} /> },
  { id: 'toa_masjid', label: 'Toa Masjid', icon: <Volume2 size={16} /> },
  { id: 'radio_jadul', label: 'Radio Jadul', icon: <Radio size={16} /> },
  { id: 'cctv', label: 'CCTV', icon: <Video size={16} /> }
];

const environments = [
  { id: 'indoor', label: 'Ruangan Kecil', icon: <Home size={16} /> },
  { id: 'hall', label: 'Gedung Kosong', icon: <Building2 size={16} /> },
  { id: 'nature', label: 'Alam Terbuka', icon: <Trees size={16} /> },
  { id: 'station', label: 'Stasiun Ramai', icon: <Globe size={16} /> }
];

const styles = [
  { id: 'centil', label: 'Centil Maksimal' },
  { id: 'amatir', label: 'Sangat Amatir' },
  { id: 'unboxing', label: 'Review Unboxing' },
  { id: 'kawaii', label: 'Imut Kawaii' },
  { id: 'sales', label: 'Sales TikTok' }
];

// --- UTILS: WAV CONVERSION ---
const createWavHeader = (dataLength) => {
  const buffer = new ArrayBuffer(44);
  const view = new DataView(buffer);
  
  const writeString = (offset, string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  writeString(0, 'RIFF');
  view.setUint32(4, 36 + dataLength, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, 1, true); // Mono
  view.setUint32(24, 24000, true); // Sample Rate
  view.setUint32(28, 24000 * 2, true); // Byte Rate
  view.setUint16(32, 2, true); // Block Align
  view.setUint16(34, 16, true); // Bits per sample
  writeString(36, 'data');
  view.setUint32(40, dataLength, true);
  
  return buffer;
};

// --- MAIN COMPONENT ---
export default function SuaraGemoyApp() {
  const [text, setText] = useState('');
  const [topic, setTopic] = useState('');
  const [voice, setVoice] = useState('Aoede');
  const [style, setStyle] = useState('centil');
  const [device, setDevice] = useState('studio_mic');
  const [environment, setEnvironment] = useState('indoor');
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [intensity, setIntensity] = useState(100);
  const [targetDuration, setTargetDuration] = useState(15);
  
  const audioRef = useRef(null);
  const apiKey = ""; // Isi dengan API Key Gemini Anda

  // --- API LOGIC ---
  const callGemini = async (prompt) => {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  };

  const generateScript = async () => {
    if (!topic) return;
    setAiLoading(true);
    try {
      const prompt = `Buatkan naskah VO untuk video pendek tentang ${topic}. Gaya bahasa: ${style}. Durasi target: ${targetDuration} detik. Kembalikan HANYA teks naskahnya saja.`;
      const result = await callGemini(prompt);
      setText(result);
    } catch (e) {
      console.error(e);
    } finally {
      setAiLoading(false);
    }
  };

  const fixScript = async () => {
    if (!text) return;
    setAiLoading(true);
    try {
      const prompt = `Sempurnakan naskah berikut agar lebih sesuai dengan gaya ${style} dan pas dibaca dalam ${targetDuration} detik: "${text}". Kembalikan HANYA teks naskahnya saja.`;
      const result = await callGemini(prompt);
      setText(result);
    } catch (e) {
      console.error(e);
    } finally {
      setAiLoading(false);
    }
  };

  const generateTTS = async () => {
    if (!text) return;
    setLoading(true);
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          contents: [{ parts: [{ text: text }] }],
          generationConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: voice } } }
        })
      });
      const data = await response.json();
      const base64Data = data.candidates[0].content.parts[0].inlineData.data;
      
      // Convert Base64 to WAV
      const binaryString = window.atob(base64Data);
      const len = binaryString.length;
      const bytes = new Int16Array(len / 2);
      for (let i = 0; i < len; i += 2) {
        bytes[i / 2] = (binaryString.charCodeAt(i + 1) << 8) | binaryString.charCodeAt(i);
      }
      
      const wavHeader = createWavHeader(len);
      const wavBlob = new Blob([wavHeader, binaryString], { type: 'audio/wav' });
      const url = URL.createObjectURL(wavBlob);
      setAudioUrl(url);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // --- AUDIO PLAYER EVENTS ---
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnd = () => setIsPlaying(false);
    
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnd);
    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnd);
    };
  }, [audioUrl]);

  const togglePlay = () => {
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-yellow-400 selection:text-black">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #18181b; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #facc15; border-radius: 0; border: 2px solid #18181b; }
        @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        .animate-marquee { display: inline-block; animation: marquee 20s linear infinite; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        .animate-blink { animation: blink 1s infinite; }
      `}</style>

      {/* MARQUEE */}
      <div className="bg-yellow-400 text-black py-2 border-b-4 border-black overflow-hidden whitespace-nowrap">
        <div className="animate-marquee font-black uppercase tracking-widest text-sm">
          free boleh diedit tapi jangan dijual, jangan lupa follow arekgresikid di github • 
          free boleh diedit tapi jangan dijual, jangan lupa follow arekgresikid di github •
        </div>
      </div>

      {/* LOADING OVERLAY */}
      {(loading || aiLoading) && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center">
          <div className="w-20 h-20 border-8 border-yellow-400 border-t-transparent rounded-full animate-spin mb-6"></div>
          <p className="text-yellow-400 font-black uppercase tracking-[0.3em] animate-blink text-2xl">
            {loading ? 'SYNTHESIZING...' : 'AI THINKING...'}
          </p>
        </div>
      )}

      <div className="max-w-[1400px] mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* SIDEBAR */}
        <div className="lg:col-span-4 space-y-8">
          <header className="border-b-4 border-yellow-400 pb-4">
            <h1 className="text-5xl font-black uppercase tracking-tighter leading-none">
              SUARA <span className="text-yellow-400">GEMOY</span>
            </h1>
            <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] mt-2">
              by RuangRiung
            </p>
          </header>

          {/* VOICE LIST */}
          <div className="space-y-4">
            <label className="text-zinc-500 font-black uppercase tracking-widest text-xs">Pilih Karakter</label>
            <div className="h-[400px] overflow-y-auto pr-4 space-y-2 custom-scrollbar">
              {voices.map(v => (
                <button 
                  key={v.id}
                  onClick={() => setVoice(v.name)}
                  className={`w-full text-left p-4 rounded-3xl border-4 transition-all ${
                    voice === v.name 
                    ? 'bg-yellow-400 border-white text-black' 
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-600'
                  }`}
                >
                  <p className="font-black uppercase tracking-wider text-sm">{v.name}</p>
                  <p className="text-[10px] font-bold opacity-70">{v.tags.join(' • ')}</p>
                </button>
              ))}
            </div>
          </div>

          {/* DROPDOWNS */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-zinc-500 font-black uppercase tracking-widest text-[10px]">Alat Rekam</label>
              <select 
                value={device} 
                onChange={e => setDevice(e.target.value)}
                className="w-full bg-zinc-900 border-4 border-zinc-800 rounded-2xl p-3 font-bold text-xs uppercase"
              >
                {devices.map(d => <option key={d.id} value={d.id}>{d.label}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-zinc-500 font-black uppercase tracking-widest text-[10px]">Lingkungan</label>
              <select 
                value={environment} 
                onChange={e => setEnvironment(e.target.value)}
                className="w-full bg-zinc-900 border-4 border-zinc-800 rounded-2xl p-3 font-bold text-xs uppercase"
              >
                {environments.map(env => <option key={env.id} value={env.id}>{env.label}</option>)}
              </select>
            </div>
          </div>

          {/* SLIDERS */}
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between text-zinc-500 font-black uppercase tracking-widest text-[10px]">
                <span>Natural Realisme</span>
                <span className="text-yellow-400">{intensity}%</span>
              </div>
              <input 
                type="range" 
                value={intensity} 
                onChange={e => setIntensity(e.target.value)}
                className="w-full h-4 bg-zinc-900 rounded-full appearance-none cursor-pointer accent-yellow-400 border-2 border-zinc-800"
              />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-zinc-500 font-black uppercase tracking-widest text-[10px]">
                <span>Target Durasi</span>
                <span className="text-yellow-400">{targetDuration}s</span>
              </div>
              <input 
                type="range" 
                min="5" max="120"
                value={targetDuration} 
                onChange={e => setTargetDuration(e.target.value)}
                className="w-full h-4 bg-zinc-900 rounded-full appearance-none cursor-pointer accent-yellow-400 border-2 border-zinc-800"
              />
            </div>
          </div>
        </div>

        {/* WORKSPACE */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* STYLE CHOOSER */}
          <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
            {styles.map(s => (
              <button 
                key={s.id}
                onClick={() => setStyle(s.id)}
                className={`whitespace-nowrap px-6 py-3 rounded-full border-4 font-black uppercase tracking-widest text-[10px] transition-all ${
                  style === s.id ? 'bg-yellow-400 border-black text-black' : 'bg-zinc-900 border-zinc-800 text-zinc-500'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* TOPIC INPUT */}
          <div className="flex gap-4">
            <input 
              type="text" 
              placeholder="MASUKKAN TOPIK KONTEN..."
              value={topic}
              onChange={e => setTopic(e.target.value)}
              className="flex-1 bg-zinc-900 border-4 border-zinc-800 rounded-3xl px-6 py-4 font-black uppercase tracking-wider outline-none focus:border-yellow-400"
            />
            <button 
              onClick={generateScript}
              className="bg-zinc-900 border-4 border-zinc-800 hover:border-yellow-400 px-8 rounded-3xl font-black uppercase tracking-widest text-xs transition-all flex items-center gap-3"
            >
              <Sparkles size={18} className="text-yellow-400" />
              GENERATE NASKAH
            </button>
          </div>

          {/* TEXTAREA AREA */}
          <div className="relative">
            <textarea 
              value={text}
              onChange={e => setText(e.target.value)}
              className="w-full h-[300px] bg-zinc-900 border-4 border-zinc-800 rounded-[2.5rem] p-8 font-bold text-lg outline-none focus:border-yellow-400 resize-none custom-scrollbar"
              placeholder="TULIS ATAU GENERATE NASKAH DI SINI..."
            />
            <button 
              onClick={fixScript}
              className="absolute bottom-6 right-6 bg-yellow-400 text-black px-6 py-3 rounded-full font-black uppercase tracking-widest text-[10px] shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <RefreshCcw size={14} />
              Sempurnakan Script
            </button>
          </div>

          {/* PLAYER */}
          <div className="bg-zinc-900 border-4 border-zinc-800 rounded-[2rem] p-6 space-y-4">
            <div className="flex items-center gap-6">
              <button 
                onClick={togglePlay}
                disabled={!audioUrl}
                className="w-16 h-16 bg-yellow-400 text-black rounded-full flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-30 transition-all"
              >
                {isPlaying ? <Pause fill="currentColor" /> : <Play fill="currentColor" className="ml-1" />}
              </button>
              <div className="flex-1 space-y-2">
                <input 
                  type="range" 
                  min="0" 
                  max={duration || 0}
                  value={currentTime}
                  onChange={e => {
                    const time = parseFloat(e.target.value);
                    audioRef.current.currentTime = time;
                    setCurrentTime(time);
                  }}
                  className="w-full h-2 bg-black rounded-full appearance-none cursor-pointer accent-yellow-400"
                />
                <div className="flex justify-between font-black text-[10px] tracking-widest text-zinc-500">
                  <span>{new Date(currentTime * 1000).toISOString().substr(14, 5)}</span>
                  <span>{new Date(duration * 1000).toISOString().substr(14, 5)}</span>
                </div>
              </div>
              <a 
                href={audioUrl} 
                download="suara_gemoy.wav"
                className={`p-4 bg-zinc-800 rounded-full hover:text-yellow-400 transition-all ${!audioUrl && 'opacity-30 pointer-events-none'}`}
              >
                <Download />
              </a>
            </div>
            <audio ref={audioRef} src={audioUrl} className="hidden" />
          </div>

          {/* GENERATE BUTTON */}
          <button 
            onClick={generateTTS}
            className="w-full bg-yellow-400 text-black py-10 rounded-[3rem] font-black uppercase tracking-[0.5em] text-3xl shadow-[0_0_50px_rgba(250,204,21,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all border-8 border-white"
          >
            GENERATE SUARA GEMOY
          </button>
        </div>

      </div>
    </div>
  );
}
```
