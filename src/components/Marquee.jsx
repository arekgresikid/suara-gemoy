import React from 'react';

const Marquee = () => {
  return (
    <div className="fixed top-0 left-0 w-full bg-yellow-400 text-black py-2.5 z-50 overflow-hidden font-black text-[10px] uppercase border-b-4 border-black">
      <div className="whitespace-nowrap animate-marquee flex gap-12">
        <span>BUAT KONTEN VIRAL DENGAN SUARA GEMOY • KUNJUNGI HTTPS://GEMOY.RUANGRIUNG.MY.ID • TEKNOLOGI AI TERBARU UNTUK KREATOR INDONESIA • BUAT KONTEN VIRAL DENGAN SUARA GEMOY • KUNJUNGI HTTPS://GEMOY.RUANGRIUNG.MY.ID</span>
        <span>BUAT KONTEN VIRAL DENGAN SUARA GEMOY • KUNJUNGI HTTPS://GEMOY.RUANGRIUNG.MY.ID • TEKNOLOGI AI TERBARU UNTUK KREATOR INDONESIA • BUAT KONTEN VIRAL DENGAN SUARA GEMOY • KUNJUNGI HTTPS://GEMOY.RUANGRIUNG.MY.ID</span>
      </div>
    </div>
  );
};

export default Marquee;
