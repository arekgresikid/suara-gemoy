import React from 'react';
import { Music, User, Mic2, Smartphone, Volume2, Radio, Zap, Home, Building, Trees, Waves } from 'lucide-react';
import { voices, devices, environments, aiModels, audioModels } from '../constants/data';

const Sidebar = ({ 
  voice, setVoice, 
  device, setDevice, 
  environment, setEnvironment, 
  intensity, setIntensity, 
  targetDuration, setTargetDuration,
  selectedModel, setSelectedModel,
  selectedAudioModel, setSelectedAudioModel
}) => {
  // Grouping voices by gender/type
  const femaleVoices = voices.filter(v => ['nova', 'shimmer', 'bella', 'rachel', 'sarah', 'lily', 'alloy'].includes(v.mapping));
  const maleVoices = voices.filter(v => ['echo', 'onyx', 'adam', 'antoni', 'liam', 'josh', 'sam', 'brian'].includes(v.mapping));

  const VoiceSection = ({ title, list }) => (
    <div className="space-y-3">
      <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] px-1">{title}</h3>
      <div className="grid grid-cols-1 gap-2">
        {list.map(v => (
          <button
            key={v.name}
            onClick={() => setVoice(v.name)}
            className={`group flex items-center gap-3 p-3.5 rounded-2xl border-2 transition-all duration-300 ${
              voice === v.name 
                ? 'border-yellow-400 bg-yellow-400/10 shadow-[0_0_20px_rgba(250,204,21,0.1)]' 
                : 'border-zinc-800/50 bg-zinc-800/20 hover:border-zinc-700 hover:bg-zinc-800/50'
            }`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
              voice === v.name ? 'bg-yellow-400 text-black' : 'bg-zinc-800 text-zinc-500 group-hover:text-zinc-300'
            }`}>
              <User size={16} />
            </div>
            <div className="text-left flex-1">
              <p className={`text-[11px] font-bold uppercase tracking-tight ${voice === v.name ? 'text-yellow-400' : 'text-zinc-300'}`}>{v.name}</p>
              <p className="text-[8px] text-zinc-500 mt-0.5 uppercase tracking-tighter">{v.tags.join(' • ')}</p>
            </div>
            {voice === v.name && (
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            )}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="lg:col-span-4 space-y-10">
      <div className="relative">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-400/20 rotate-3">
            <Music className="text-black" size={28} />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tighter uppercase leading-none">SUARA <span className="text-yellow-400 italic">GEMOY</span></h1>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em] mt-1">RuangRiung Engine Vocal v2.0</p>
          </div>
        </div>


        <div className="h-px bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 my-8 opacity-50" />
        
        <div className="space-y-8">
          {/* AI ENGINE SECTION */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap size={14} className="text-yellow-400" />
              <h2 className="text-[11px] font-black text-white uppercase tracking-widest">AI Engine Settings</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block ml-1">Naskah Generation</label>
                <select 
                  value={selectedModel} 
                  onChange={e => setSelectedModel(e.target.value)}
                  className="w-full bg-black/40 border-2 border-zinc-800 rounded-2xl p-4 text-[10px] font-bold outline-none focus:border-yellow-400/50 transition-all text-white appearance-none cursor-pointer"
                >
                  {aiModels.map(m => <option key={m.id} value={m.id}>{m.label}</option>)}
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block ml-1">Vocal Synthesis</label>
                <select 
                  value={selectedAudioModel} 
                  onChange={e => setSelectedAudioModel(e.target.value)}
                  className="w-full bg-black/40 border-2 border-zinc-800 rounded-2xl p-4 text-[10px] font-bold outline-none focus:border-yellow-400/50 transition-all text-white appearance-none cursor-pointer"
                >
                  {audioModels.map(m => <option key={m.id} value={m.id}>{m.label}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* CHARACTER LIST SECTION */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <User size={14} className="text-yellow-400" />
              <h2 className="text-[11px] font-black text-white uppercase tracking-widest">Karakter Suara</h2>
            </div>
            
            <div className="space-y-6 max-h-[400px] overflow-y-auto pr-3 custom-scrollbar">
              <VoiceSection title="Karakter Cewek" list={femaleVoices} />
              <VoiceSection title="Karakter Cowok" list={maleVoices} />
            </div>
          </div>

          {/* AUDIO CONFIG SECTION */}
          <div className="space-y-4 pt-4 border-t border-zinc-800/50">
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block ml-1">Hardware</label>
                  <select value={device} onChange={e => setDevice(e.target.value)} className="w-full bg-black/40 border-2 border-zinc-800 rounded-xl p-3 text-[10px] font-bold outline-none focus:border-yellow-400/50 text-zinc-300">
                    {devices.map(d => <option key={d.id} value={d.id}>{d.label}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block ml-1">Space</label>
                  <select value={environment} onChange={e => setEnvironment(e.target.value)} className="w-full bg-black/40 border-2 border-zinc-800 rounded-xl p-3 text-[10px] font-bold outline-none focus:border-yellow-400/50 text-zinc-300">
                    {environments.map(env => <option key={env.id} value={env.id}>{env.label}</option>)}
                  </select>
                </div>
             </div>
          </div>

          {/* SLIDER SECTION */}
          <div className="bg-black/40 p-6 rounded-[2rem] border border-zinc-800/50 space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center px-1">
                <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Intensity</span>
                <span className="text-xs font-black text-yellow-400">{intensity}%</span>
              </div>
              <input type="range" className="w-full accent-yellow-400 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer" value={intensity} onChange={e => setIntensity(e.target.value)}/>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center px-1">
                <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Duration</span>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-black text-yellow-400">{targetDuration}</span>
                  <span className="text-[8px] font-bold text-zinc-500">SEC</span>
                </div>
              </div>
              <input type="range" min="5" max="120" step="5" className="w-full accent-yellow-400 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer" value={targetDuration} onChange={e => setTargetDuration(parseInt(e.target.value))}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
