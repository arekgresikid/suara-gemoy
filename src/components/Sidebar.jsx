import React from 'react';
import { Music, User } from 'lucide-react';
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
  return (
    <div className="lg:col-span-4 space-y-6">
      <div className="bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-800 shadow-2xl sticky top-20">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center">
            <Music className="text-black" size={24} />
          </div>
          <h1 className="text-3xl font-black tracking-tighter uppercase">SUARA <span className="text-yellow-400">GEMOY</span></h1>
        </div>
        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em] mb-8 ml-1">Powered by Advanced AI Engine</p>
        
        <div className="space-y-6">
          {/* AI Model Selection */}
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block">Model AI Naskah</label>
              <select 
                value={selectedModel} 
                onChange={e => setSelectedModel(e.target.value)}
                className="w-full bg-zinc-800 border-2 border-zinc-700 rounded-xl p-3 text-[10px] font-bold outline-none focus:border-yellow-400 text-yellow-400 cursor-pointer"
              >
                {aiModels.map(m => <option key={m.id} value={m.id}>{m.label}</option>)}
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block">Model AI Suara</label>
              <select 
                value={selectedAudioModel} 
                onChange={e => setSelectedAudioModel(e.target.value)}
                className="w-full bg-zinc-800 border-2 border-zinc-700 rounded-xl p-3 text-[10px] font-bold outline-none focus:border-yellow-400 text-yellow-400 cursor-pointer"
              >
                {audioModels.map(m => <option key={m.id} value={m.id}>{m.label}</option>)}
              </select>
            </div>
          </div>

          {/* Karakter List */}
          <div>
            <label className="text-[9px] font-black text-zinc-500 uppercase mb-3 block tracking-widest flex items-center gap-2">
               Karakter Suara ({voices.length})
            </label>
            <div className="grid grid-cols-1 gap-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
              {voices.map(v => (
                <button
                  key={v.name}
                  onClick={() => setVoice(v.name)}
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                    voice === v.name ? 'border-yellow-400 bg-yellow-400/10 text-yellow-400' : 'border-zinc-800 bg-zinc-800/30 text-zinc-500 hover:border-zinc-700'
                  }`}
                >
                  <User size={14} />
                  <div className="text-left flex-1">
                    <p className="text-[11px] font-black uppercase leading-none">{v.name}</p>
                    <p className="text-[8px] opacity-60 mt-1 uppercase tracking-tight">{v.tags.join(' • ')}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Hardware & Space */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Alat Rekam</label>
              <select 
                value={device} 
                onChange={e => setDevice(e.target.value)}
                className="w-full bg-zinc-800 border-2 border-zinc-700 rounded-xl p-3 text-[10px] font-bold outline-none focus:border-yellow-400 text-yellow-400"
              >
                {devices.map(d => <option key={d.id} value={d.id}>{d.label}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Lingkungan</label>
              <select 
                value={environment} 
                onChange={e => setEnvironment(e.target.value)}
                className="w-full bg-zinc-800 border-2 border-zinc-700 rounded-xl p-3 text-[10px] font-bold outline-none focus:border-yellow-400 text-yellow-400"
              >
                {environments.map(env => <option key={env.id} value={env.id}>{env.label}</option>)}
              </select>
            </div>
          </div>

          {/* Precision Tuning */}
          <div className="bg-zinc-800/30 p-5 rounded-2xl border border-zinc-800 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Natural Realisme</span>
              <span className="text-xs font-black text-yellow-400">{intensity}%</span>
            </div>
            <input type="range" className="w-full accent-yellow-400 h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer" value={intensity} onChange={e => setIntensity(e.target.value)}/>
            
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Target Durasi</span>
              <div className="flex items-center gap-1">
                <input type="number" value={targetDuration} onChange={e => setTargetDuration(parseInt(e.target.value))} className="w-8 bg-black border border-zinc-700 text-yellow-400 text-[10px] font-black rounded p-0.5 text-center"/>
                <span className="text-[8px] font-bold">DETIK</span>
              </div>
            </div>
            <input type="range" min="5" max="120" step="5" className="w-full accent-yellow-400 h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer" value={targetDuration} onChange={e => setTargetDuration(parseInt(e.target.value))}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
