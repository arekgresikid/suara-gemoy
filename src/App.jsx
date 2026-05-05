import React, { useState, useRef, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Workstation from './components/Workstation';
import { Download } from 'lucide-react';
import LoadingOverlay from './components/LoadingOverlay';
import Marquee from './components/Marquee';
import WelcomeModal from './components/WelcomeModal';
import { callPollinationsText, generateSpeech } from './utils/api';
import { voices, devices, environments, styles } from './constants/data';

const App = () => {
  // State Management
  const [showWelcome, setShowWelcome] = useState(true);
  const [text, setText] = useState('');
  const [topic, setTopic] = useState('');
  const [voice, setVoice] = useState('Aoede');
  const [style, setStyle] = useState('natural_centil');
  const [device, setDevice] = useState('studio_mic');
  const [environment, setEnvironment] = useState('indoor');
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [error, setError] = useState(null);
  const [intensity, setIntensity] = useState(100);
  const [targetDuration, setTargetDuration] = useState(15);
  const [selectedModel, setSelectedModel] = useState('openai');
  const [selectedAudioModel, setSelectedAudioModel] = useState('elevenlabs');

  // Audio Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const apiKey = import.meta.env.VITE_POLLINATIONS_API_KEY; 

  // Audio Event Listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const setAudioData = () => setDuration(audio.duration);
    const setAudioTime = () => setCurrentTime(audio.currentTime);
    const handleEnd = () => setIsPlaying(false);
    audio.addEventListener('loadedmetadata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('ended', handleEnd);
    return () => {
      audio.removeEventListener('loadedmetadata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.removeEventListener('ended', handleEnd);
    };
  }, [audioUrl]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleFixScript = async () => {
    if (!text) return;
    setAiLoading(true);
    setError(null);
    try {
      const selectedStyle = styles.find(s => s.id === style);
      const systemPrompt = `Ubah teks menjadi naskah VO ${selectedStyle.label}. Durasi target: ${targetDuration} detik. Gunakan bahasa gaul. Kembalikan HANYA teks naskah.`;
      const fixedText = await callPollinationsText(systemPrompt, text, selectedModel, apiKey);
      if (fixedText) setText(fixedText.trim());
    } catch (err) {
      setError(`Gagal memperbaiki naskah: ${err.message}`);
    } finally {
      setAiLoading(false);
    }
  };

  const handleGenerateScript = async () => {
    if (!topic) return setError("Masukkan topik terlebih dahulu!");
    setAiLoading(true);
    setError(null);
    try {
      const selectedStyle = styles.find(s => s.id === style);
      const systemPrompt = `Buatkan naskah VO gaya ${selectedStyle.label} tentang ${topic}. Pastikan naskah pas untuk dibaca dalam ${targetDuration} detik. Kembalikan HANYA teks naskah.`;
      const newScript = await callPollinationsText(systemPrompt, `Buat naskah tentang: ${topic}`, selectedModel, apiKey);
      if (newScript) setText(newScript.trim());
    } catch (err) {
      setError(`Gagal generate naskah: ${err.message}`);
    } finally {
      setAiLoading(false);
    }
  };

  const handleGenerateSpeech = async () => {
    if (!text.trim()) return setError("Naskah tidak boleh kosong!");
    setLoading(true);
    setError(null);
    setAudioUrl(null);
    setIsPlaying(false);

    try {
      const selectedVoice = voices.find(v => v.name === voice) || voices[0];
      const voiceMapping = selectedVoice?.mapping || 'nova';
      const audioBlob = await generateSpeech(text, voiceMapping, selectedAudioModel, apiKey);
      setAudioUrl(URL.createObjectURL(audioBlob));
      setIsPlaying(true);
    } catch (err) {
      setError(`Terjadi kesalahan sistem saat memproses suara: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-yellow-400 selection:text-black overflow-x-hidden">
      <WelcomeModal isOpen={showWelcome} onClose={() => setShowWelcome(false)} />

      {/* Global Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-yellow-400/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-yellow-400/5 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 pt-24 pb-20 px-6">
        <Sidebar 
          voice={voice} setVoice={setVoice}
          device={device} setDevice={setDevice}
          environment={environment} setEnvironment={setEnvironment}
          intensity={intensity} setIntensity={setIntensity}
          targetDuration={targetDuration} setTargetDuration={setTargetDuration}
          selectedModel={selectedModel} setSelectedModel={setSelectedModel}
          selectedAudioModel={selectedAudioModel} setSelectedAudioModel={setSelectedAudioModel}
        />

        <Workstation 
          style={style} setStyle={setStyle}
          topic={topic} setTopic={setTopic}
          text={text} setText={setText}
          handleGenerateScript={handleGenerateScript}
          handleFixScript={handleFixScript}
          generateSpeech={handleGenerateSpeech}
          aiLoading={aiLoading}
          loading={loading}
          audioUrl={audioUrl}
          isPlaying={isPlaying}
          togglePlay={togglePlay}
          currentTime={currentTime}
          duration={duration}
          handleSeek={handleSeek}
          formatTime={formatTime}
          error={error}
          audioRef={audioRef}
        />
      </div>

      {/* Download Shortcut Footer */}
      <footer className="relative z-10 max-w-[1400px] mx-auto px-6 pb-10">
        <div className="flex justify-center">
          <a 
            href="/download.html" 
            target="_blank"
            className="group flex items-center gap-3 bg-zinc-900/50 border-2 border-zinc-800 hover:border-yellow-400 px-6 py-3 rounded-full transition-all duration-300 backdrop-blur-sm"
          >
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform">
              <Download size={14} className="text-black" />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-black text-white uppercase tracking-widest leading-none">Download Assets</p>
              <p className="text-[8px] text-zinc-500 font-bold uppercase mt-1">Prompt & GitHub Repository</p>
            </div>
          </a>
        </div>
      </footer>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #facc15; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 25s linear infinite; }
      `}</style>
    </div>
  );
};

export default App;
