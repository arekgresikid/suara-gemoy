import { 
  Sparkles, Ghost, Coffee, Baby, ShoppingBag,
  Home, Building, Trees, Waves,
  Mic2, Smartphone, Volume2, Radio, Zap
} from 'lucide-react';
import React from 'react';

export const voices = [
  { name: 'Aoede', tags: ['Ceria', 'Gen-Z'], mapping: 'nova' },
  { name: 'Despina', tags: ['Manja', 'Imut'], mapping: 'shimmer' },
  { name: 'Callirrhoe', tags: ['Sangat Centil'], mapping: 'shimmer' },
  { name: 'Kore', tags: ['Reviewer', 'Cepat'], mapping: 'alloy' },
  { name: 'Puck', tags: ['Pria', 'Lucu'], mapping: 'echo' },
  { name: 'Zephyr', tags: ['Pria', 'Cool'], mapping: 'onyx' },
  { name: 'Charon', tags: ['Pria', 'Berat'], mapping: 'onyx' },
  { name: 'Fenrir', tags: ['Pria', 'Deep'], mapping: 'onyx' },
  { name: 'Leda', tags: ['Wanita', 'Soft'], mapping: 'fable' },
  { name: 'Autonoe', tags: ['Soft Girl'], mapping: 'fable' },
  { name: 'Erinome', tags: ['Elegan'], mapping: 'nova' },
  { name: 'Algieba', tags: ['Pria', 'Wibawa'], mapping: 'onyx' },
  { name: 'Achernar', tags: ['Pria', 'Energi'], mapping: 'echo' },
  { name: 'Alnilam', tags: ['Wanita', 'Narasi'], mapping: 'alloy' },
  { name: 'Gacrux', tags: ['Wanita', 'Tegas'], mapping: 'alloy' },
  { name: 'Zubenelgenubi', tags: ['Pria', 'Unik'], mapping: 'echo' },
];

export const devices = [
  { id: 'studio_mic', label: 'Studio Condenser', icon: <Mic2 size={14} />, desc: 'Suara jernih profesional' },
  { id: 'smartphone', label: 'HP Murah', icon: <Smartphone size={14} />, desc: 'Suara pecah khas konten viral' },
  { id: 'toa', label: 'Toa Masjid', icon: <Volume2 size={14} />, desc: 'Gema keras dan pecah' },
  { id: 'old_radio', label: 'Radio Jadul', icon: <Radio size={14} />, desc: 'Lo-fi dan berdesis' },
  { id: 'cctv', label: 'Mic CCTV', icon: <Zap size={14} />, desc: 'Kualitas rendah & noise tinggi' },
];

export const environments = [
  { id: 'indoor', label: 'Ruangan Kecil', icon: <Home size={14} /> },
  { id: 'hall', label: 'Gedung Kosong', icon: <Building size={14} /> },
  { id: 'forest', label: 'Alam Terbuka', icon: <Trees size={14} /> },
  { id: 'station', label: 'Stasiun Ramai', icon: <Waves size={14} /> },
];

export const styles = [
  { id: 'natural_centil', label: 'Centil Maksimal', icon: <Sparkles className="text-yellow-400" size={16} /> },
  { id: 'amateur_extreme', label: 'Sangat Amatir', icon: <Ghost className="text-slate-400" size={16} /> },
  { id: 'amateur_review', label: 'Review Unboxing', icon: <Coffee className="text-yellow-600" size={16} /> },
  { id: 'imut_kawaii', label: 'Imut / Kawaii', icon: <Baby className="text-yellow-300" size={16} /> },
  { id: 'sales_barbar', label: 'Sales TikTok Live', icon: <ShoppingBag className="text-yellow-500" size={16} /> }
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
