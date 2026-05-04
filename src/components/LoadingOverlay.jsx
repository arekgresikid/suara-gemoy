import React from 'react';

const LoadingOverlay = ({ visible }) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-md flex flex-col items-center justify-center pointer-events-none">
      <div className="bg-zinc-900/90 p-12 rounded-[3.5rem] border border-yellow-400/20 flex flex-col items-center shadow-[0_0_50px_rgba(250,204,21,0.1)]">
        <div className="w-16 h-16 border-4 border-yellow-400/10 border-t-yellow-400 rounded-full animate-spin mb-6"></div>
        <h2 className="text-3xl font-black text-yellow-400 tracking-[0.2em] animate-pulse">RUANGRIUNG</h2>
        <p className="text-[10px] text-zinc-500 font-bold tracking-[0.3em] mt-3">SEDANG MERACIK SUARA GEMOY...</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
