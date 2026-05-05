# Prompt Suara Gemoy by RuangRiung

Bertindaklah sebagai Senior React Developer dan UI/UX Expert. Buatkan saya sebuah aplikasi web bernama "Suara Gemoy by RuangRiung", yaitu aplikasi AI Voice Generator (Text-to-Speech) dengan gaya desain Brutalist Modern.

Gunakan stack berikut: React (Functional Component & Hooks), Tailwind CSS untuk styling, dan 'lucide-react' untuk ikon.

Berikut adalah spesifikasi lengkap aplikasi yang harus dibuat dalam satu file utuh:

1. TEMA & UI/UX DESIGN (BRUTALIST MODERN):
- Warna dominan: Background Hitam (bg-black), elemen abu-abu gelap (bg-zinc-900), dan warna aksen Kuning Terang (bg-yellow-400).
- Tipografi: Gunakan font sans-serif, banyak menggunakan huruf kapital (uppercase), font tebal (font-black), dan jarak huruf yang lebar (tracking-widest) untuk label.
- Bentuk: Gunakan border radius yang sangat membulat (rounded-[2.5rem] atau rounded-3xl) dan border tebal untuk elemen input/tombol.
- Efek Visual: Tambahkan running text (marquee) di bagian paling atas web yang bertuliskan "free boleh diedit tapi jangan dijual, jangan lupa follow arekgresikid di github". Buat efek loading overlay transparan dengan spinner dan teks berkedip saat AI sedang memproses.

2. STATE MANAGEMENT (useState):
- Teks naskah (text), Topik untuk AI (topic), Voice (voice, default: 'Aoede').
- Style/Gaya (style, default: 'natural_centil').
- Device/Alat (device, default: 'studio_mic').
- Environment/Lingkungan (environment, default: 'indoor').
- Loading states (loading untuk TTS, aiLoading untuk naskah).
- Audio (audioUrl, isPlaying, currentTime, duration).
- Parameter (intensity: 100, targetDuration: 15).

3. DATA MOCK (DATABASE LOKAL):
- Buat array `voices` berisi 16 karakter (contoh: Aoede, Despina, Callirrhoe, Puck, Zephyr, dll) lengkap dengan tag karakteristiknya.
- Buat array `devices` (Studio Mic, HP Murah, Toa Masjid, Radio Jadul, CCTV) beserta deskripsinya.
- Buat array `environments` (Ruangan Kecil, Gedung Kosong, Alam Terbuka, Stasiun Ramai).
- Buat array `styles` (Centil Maksimal, Sangat Amatir, Review Unboxing, Imut Kawaii, Sales TikTok).

4. LAYOUT GRID (Kiri & Kanan):
- Bagian Kiri (Sidebar): Header aplikasi, daftar karakter suara (bisa di-scroll dengan custom scrollbar), dropdown Alat Rekam, dropdown Lingkungan, slider Natural Realisme (0-100%), dan slider Target Durasi (5-120 detik).
- Bagian Kanan (Workspace): 
  a. Pilihan Gaya Karakter (tombol horizontal).
  b. Input text "Topik konten" dan tombol "Generate Naskah AI".
  c. Textarea besar untuk menulis/mengedit naskah dan tombol floating "Sempurnakan Script".
  d. Custom Audio Player (Play/Pause, Progress bar range, timer, tombol Download WAV).
  e. Tombol utama raksasa "GENERATE SUARA GEMOY".

5. INTEGRASI API & LOGIKA UTAMA:
- Sediakan variabel `apiKey` (kosongkan string-nya agar saya bisa isi sendiri).
- Buat fungsi pemanggil Gemini API (model: gemini-2.5-flash-preview-09-2025:generateContent) untuk 2 hal: 
  1) Generate naskah baru berdasarkan Topik.
  2) Sempurnakan/Fix naskah yang ada agar sesuai dengan target durasi dan gaya bahasa.
- Buat fungsi Text-to-Speech menggunakan Gemini API (model: gemini-2.5-flash-preview-tts).
- PENTING: Karena Gemini TTS mengembalikan audio dalam bentuk inlineData Base64 (data PCM mentah/RAW), sertakan algoritma konversi dari Base64 string menjadi array byte (Int16Array), lalu tambahkan RIFF WAV Header (menggunakan DataView dan ArrayBuffer), dan jadikan Blob berformat 'audio/wav' agar bisa diputar di elemen <audio> HTML dan didownload.
- Buat event listener menggunakan `useRef` and `useEffect` untuk mengatur progres audio player custom (waktu saat ini, durasi, sinkronisasi range input).

Tuliskan seluruh kodenya dalam satu file React penuh, pastikan kodenya bersih, fungsional, menggunakan styling Tailwind penuh tanpa file CSS eksternal (kecuali untuk keyframes marquee dan scrollbar masukkan ke tag <style> di dalam komponen).
