import React from 'react';

const Marquee = () => {
  return (
    <div className="fixed top-0 left-0 w-full bg-yellow-400 text-black py-2.5 z-50 overflow-hidden font-black text-[10px] uppercase border-b-4 border-black">
      <div className="whitespace-nowrap animate-marquee flex gap-12">
        <span>SUARA GEMOY BY RUANGRIUNG • AI TEXT-TO-SPEECH TERCANGGIH • PILIH MODEL AI FAVORITMU: OPENAI, CLAUDE, GEMINI, LLAMA • GENERATE SUARA PREMIUM DENGAN ELEVENLABS & QWEN • COCOK UNTUK KONTEN TIKTOK, REELS & YOUTUBE SHORTS •</span>
        <span>SUARA GEMOY BY RUANGRIUNG • AI TEXT-TO-SPEECH TERCANGGIH • PILIH MODEL AI FAVORITMU: OPENAI, CLAUDE, GEMINI, LLAMA • GENERATE SUARA PREMIUM DENGAN ELEVENLABS & QWEN • COCOK UNTUK KONTEN TIKTOK, REELS & YOUTUBE SHORTS •</span>
      </div>
    </div>
  );
};

export default Marquee;
