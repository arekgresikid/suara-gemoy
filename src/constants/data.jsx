import { 
  Sparkles, Ghost, Coffee, Baby, ShoppingBag,
  Home, Building, Trees, Waves,
  Mic2, Smartphone, Volume2, Radio, Zap
} from 'lucide-react';
import React from 'react';

export const voices = [
  // CEWEK - GEMOY & CENTIL
  { name: 'Aoede', tags: ['Ceria', 'Gen-Z'], mapping: 'nova' },
  { name: 'Despina', tags: ['Manja', 'Imut'], mapping: 'shimmer' },
  { name: 'Callirrhoe', tags: ['Sangat Centil'], mapping: 'shimmer' },
  { name: 'Bella', tags: ['Imut', 'Kawaii'], mapping: 'bella' },
  { name: 'Rachel', tags: ['Dewasa', 'Elegan'], mapping: 'rachel' },
  { name: 'Sarah', tags: ['Kalem', 'Soft'], mapping: 'sarah' },
  { name: 'Lily', tags: ['Kanak-kanak'], mapping: 'lily' },
  { name: 'Alnilam', tags: ['Narator', 'Review'], mapping: 'alloy' },
  
  // COWOK - BASS & COOL
  { name: 'Puck', tags: ['Pria', 'Lucu'], mapping: 'echo' },
  { name: 'Zephyr', tags: ['Pria', 'Cool'], mapping: 'onyx' },
  { name: 'Adam', tags: ['Pria', 'Deep'], mapping: 'adam' },
  { name: 'Antoni', tags: ['Pria', 'Wibawa'], mapping: 'antoni' },
  { name: 'Liam', tags: ['Pria', 'Energi'], mapping: 'liam' },
  { name: 'Josh', tags: ['Pria', 'Reviewer'], mapping: 'josh' },
  { name: 'Sam', tags: ['Pria', 'Casual'], mapping: 'sam' },
  { name: 'Brian', tags: ['Pria', 'Narator'], mapping: 'brian' },
];

export const devices = [
  { id: 'studio_mic', label: 'Studio Condenser', icon: <Mic2 size={14} />, desc: 'Suara jernih profesional' },
  { id: 'smartphone', label: 'HP Android (Old)', icon: <Smartphone size={14} />, desc: 'Khas konten viral low-res' },
  { id: 'iphone_mic', label: 'iPhone Voice Memo', icon: <Smartphone size={14} />, desc: 'Populer di TikTok/Reels' },
  { id: 'toa', label: 'Toa Masjid / Speaker', icon: <Volume2 size={14} />, desc: 'Gema keras dan pecah' },
  { id: 'old_radio', label: 'Radio Amplitudo', icon: <Radio size={14} />, desc: 'Lo-fi dan berdesis' },
  { id: 'cctv', label: 'Mic Kamera CCTV', icon: <Zap size={14} />, desc: 'Noise tinggi & distorsi' },
  { id: 'intercom', label: 'Walkie Talkie', icon: <Radio size={14} />, desc: 'Suara terputus-putus' },
  { id: 'telephone', label: 'Telepon Kabel', icon: <Smartphone size={14} />, desc: 'Mid-range bandpass filter' },
];

export const environments = [
  { id: 'indoor', label: 'Ruangan Kecil', icon: <Home size={14} /> },
  { id: 'hall', label: 'Gedung Kosong', icon: <Building size={14} /> },
  { id: 'forest', label: 'Hutan / Outdoor', icon: <Trees size={14} /> },
  { id: 'station', label: 'Stasiun Kereta', icon: <Waves size={14} /> },
  { id: 'bathroom', label: 'Kamar Mandi', icon: <Waves size={14} /> },
  { id: 'classroom', label: 'Ruang Kelas', icon: <Building size={14} /> },
  { id: 'cave', label: 'Gua Dalam', icon: <Zap size={14} /> },
  { id: 'underwater', label: 'Bawah Air', icon: <Waves size={14} /> },
];

export const styles = [
  { id: 'natural_centil', label: 'Centil Maksimal', icon: <Sparkles className="text-yellow-400" size={16} /> },
  { id: 'amateur_extreme', label: 'Sangat Amatir', icon: <Ghost className="text-slate-400" size={16} /> },
  { id: 'amateur_review', label: 'Review Unboxing', icon: <Coffee className="text-yellow-600" size={16} /> },
  { id: 'imut_kawaii', label: 'Imut / Kawaii', icon: <Baby className="text-yellow-300" size={16} /> },
  { id: 'sales_barbar', label: 'Sales TikTok Live', icon: <ShoppingBag className="text-yellow-500" size={16} /> },
  { id: 'news_anchor', label: 'Pembawa Berita TV', icon: <Zap className="text-blue-400" size={16} /> },
  { id: 'sad_story', label: 'Sad Story / Galau', icon: <Waves className="text-blue-500" size={16} /> },
  { id: 'angry_rant', label: 'Marah-Marah / Ngegas', icon: <Zap className="text-red-500" size={16} /> },
  { id: 'whisper_asmr', label: 'Bisikan ASMR', icon: <Mic2 className="text-purple-400" size={16} /> },
  { id: 'formal_pro', label: 'Presentasi Formal', icon: <Building className="text-zinc-400" size={16} /> },
  { id: 'storytelling', label: 'Dongeng / Storytelling', icon: <Trees className="text-green-400" size={16} /> },
  { id: 'shouting', label: 'Berteriak Histeris', icon: <Zap className="text-orange-500" size={16} /> },
];

export const aiModels = [
  { id: 'openai', label: 'OpenAI GPT-5.4 Nano' },
  { id: 'openai-fast', label: 'OpenAI GPT-5 Nano (Fast)' },
  { id: 'openai-large', label: 'OpenAI GPT-5.4 (Large)' },
  { id: 'claude', label: 'Claude Sonnet 4.6' },
  { id: 'claude-fast', label: 'Claude Haiku 4.5' },
  { id: 'gemini', label: 'Gemini 3 Flash' },
  { id: 'gemini-fast', label: 'Gemini 2.5 Flash Lite' },
  { id: 'deepseek', label: 'DeepSeek V4 Flash' },
  { id: 'llama', label: 'Meta Llama 3.3 70B' },
  { id: 'mistral', label: 'Mistral Small 3.1' },
  { id: 'qwen-coder', label: 'Qwen 3 Coder' },
  { id: 'grok', label: 'Grok 4.20' }
];

export const audioModels = [
  { id: 'elevenlabs', label: 'ElevenLabs v3 (Premium)' },
  { id: 'qwen-tts', label: 'Qwen 3 TTS (Fast)' },
  { id: 'qwen-tts-instruct', label: 'Qwen 3 TTS Instruct (Emotional)' }
];
