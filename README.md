# Dashboard Lapduming ke-1 — Pemeriksaan Pendahuluan Konservasi

Dashboard infografis interaktif satu layar (tanpa scroll) untuk **Laporan Perkembangan
Pelaksanaan Pemeriksaan Pendahuluan (Lapduming) ke-1** — Pemeriksaan Pendahuluan Kepatuhan
atas Pengukuhan dan Pengelolaan Kawasan Hutan Konservasi Tahun 2021 s.d. 2025.

**URL publik:** https://sudarmadi.github.io/lapduming-konservasi-dashboard/

## Isi

Halaman utama menyajikan tiga zona yang mengalir berurutan:

1. **Tujuan pemeriksaan** — dari Program Pemeriksaan (P2) Pendahuluan Konservasi.
2. **Yang telah dilakukan** — pekerjaan dua minggu pertama (Lapduming huruf A, C, D, F).
3. **Hasil yang diperoleh** — kriteria, data entitas, dan analisis SPI (Lapduming huruf B & E).

Setiap area dapat ditelusuri lebih dalam dengan mengklik — panel detail terbuka di atas
layar (breadcrumb, tombol kembali, `Esc` untuk menutup). Tautan dalam (deep link) didukung,
misalnya `#!/hasil/analisis/pengurangan`.

## Teknis

- Satu berkas `index.html` + folder `assets/` (infografis dari laporan). Tanpa basis data.
  Satu-satunya dependensi eksternal: Google Fonts (Oswald + Archivo).
- Seluruh angka & teks statis dalam objek `D` di dalam berkas — bersumber langsung dari
  `Lapduming ke-1.docx` dan `P2 Pendahuluan Konservasi.docx`.
- Grafik dibuat sebagai SVG inline.
- `assets/*.jpg` adalah infografis hasil imagegen yang ditempel pada Lapduming ke-1
  (hierarki kriteria, struktur organisasi, proses bisnis, progres penetapan). Ditampilkan
  pada panel terkait dan dapat diperbesar (lightbox). Sumber PNG asli: `output/infografis/`.
- Dioptimalkan untuk layar 16:9 (1920×1080) dan laptop; layar kecil beralih ke mode kompak.
- Mendukung mode terang & gelap mengikuti preferensi sistem.

## Memutakhirkan data

Ubah nilai pada objek `D` di bagian atas `<script>` dalam `index.html`, lalu commit.
GitHub Pages akan memublikasikan ulang otomatis.
