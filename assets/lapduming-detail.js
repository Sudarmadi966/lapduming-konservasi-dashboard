/* ============================================================
   Lapduming — kerangka halaman detail (DRY)
   Dipakai oleh semua detail-01-*.html. Setiap halaman cukup
   mengisi window.LDETAIL di <head>:

     window.LDETAIL = {
       crumb: ["Progres Tujuan 2", "Hasil yang telah dicapai", "01 · Data & Informasi"],
       title: "Data dan Informasi Awal Berhasil Dihimpun dan Dianalisis",
       sub:   "Mencakup Informasi Geospasial Tematik ...",
       tags:  ["<b>B.2.c</b> · Data terkait pengukuhan & pengelolaan",
               "Sumber: Lapduming ke-1", "s.d. Juni 2026"]
     };

   Skrip ini menyuntik: sprite ikon, tombol "Beranda", header .d-top,
   dan lightbox untuk .bagan-fig. Muat di akhir <body>:
     <script src="assets/lapduming-detail.js"></script>
   ============================================================ */
(function () {
  'use strict';

  /* ---------- sprite ikon (satu sumber) ---------- */
  var SPRITE = '<svg style="display:none" aria-hidden="true">' +
    '<symbol id="i-back" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M13 17l-5-5 5-5M18 12H8"/></symbol>' +
    '<symbol id="i-target" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><path d="M12 3V1M12 23v-2M3 12H1M23 12h-2"/></symbol>' +
    '<symbol id="i-info" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8v.5"/></symbol>' +
    '<symbol id="i-list" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01"/></symbol>' +
    '<symbol id="i-book" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h11a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2z"/><path d="M5 18a2 2 0 0 1 2-2h11"/></symbol>' +
    '<symbol id="i-zoom" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5M11 8v6M8 11h6"/></symbol>' +
    '<symbol id="i-sitemap" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="3" width="6" height="5" rx="1"/><rect x="2" y="16" width="6" height="5" rx="1"/><rect x="16" y="16" width="6" height="5" rx="1"/><path d="M12 8v4M5 16v-2h14v2"/></symbol>' +
    '<symbol id="i-users" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M16 5.5A2.5 2.5 0 0 1 16 11M18 20c0-2.5-1-4.5-2.5-5.5"/></symbol>' +
    '<symbol id="i-bank" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9 12 4l9 5M4 9v9M9 9v9M15 9v9M20 9v9M3 20h18"/></symbol>' +
    '<symbol id="i-pin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z"/><circle cx="12" cy="10" r="2.5"/></symbol>' +
    '<symbol id="i-link" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 15 15 9M10.5 6.5 12 5a4 4 0 0 1 6 6l-1.5 1.5M13.5 17.5 12 19a4 4 0 0 1-6-6l1.5-1.5"/></symbol>' +
    '<symbol id="i-gear" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 13a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V19a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H5a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H12a1.7 1.7 0 0 0 1-1.5V5a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V12a1.7 1.7 0 0 0 1.5 1H19a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/></symbol>' +
    '<symbol id="i-route" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="19" r="3"/><circle cx="18" cy="5" r="3"/><path d="M9 19h4a4 4 0 0 0 4-4V9"/><path d="M15 5h-4a4 4 0 0 0-4 4v6"/></symbol>' +
    '<symbol id="i-search" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="6"/><path d="m20 20-4.5-4.5"/></symbol>' +
    '<symbol id="i-shield" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 4 6v6c0 5 3.4 8 8 9 4.6-1 8-4 8-9V6l-8-3Z"/><path d="m9 12 2 2 4-4"/></symbol>' +
    '<symbol id="i-warn" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 2 20h20L12 3Z"/><path d="M12 9v5M12 17.5v.5"/></symbol>' +
    '<symbol id="i-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5 9-10"/></symbol>' +
    '<symbol id="i-clip" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="4" width="14" height="18" rx="2"/><path d="M9 4V2h6v2M9 10h6M9 14h6M9 18h4"/></symbol>' +
    '<symbol id="i-flag" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 21V4M5 4l6 2 8-2v11l-8 2-6-2"/></symbol>' +
    '<symbol id="i-cal" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4M7 13h3M14 13h3M7 17h3"/></symbol>' +
    '<symbol id="i-scale" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18M7 21h10M12 5 5 7m7-2 7 2M5 7 2.5 13a3.5 3.5 0 0 0 7 0L5 7Zm14 0-2.5 6a3.5 3.5 0 0 0 7 0L19 7Z"/></symbol>' +
    '<symbol id="i-doc" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2h8l4 4v16H6z"/><path d="M14 2v4h4M9 12h6M9 16h6M9 8h2"/></symbol>' +
    '<symbol id="i-map" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 6 6-2 6 2 6-2v14l-6 2-6-2-6 2V6Z"/><path d="M9 4v14M15 6v14"/></symbol>' +
    '<symbol id="i-tree" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 6 12h3l-3 5h12l-3-5h3L12 3Z"/><path d="M12 17v4"/></symbol>' +
    '<symbol id="i-db" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/></symbol>' +
    '<symbol id="i-eye" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></symbol>' +
    '</svg>';
  document.body.insertAdjacentHTML('afterbegin', SPRITE);

  /* ---------- tombol Beranda ---------- */
  if (!document.querySelector('a.home-fab')) {
    var fab = document.createElement('a');
    fab.className = 'home-fab';
    fab.href = 'periode.html';
    fab.setAttribute('aria-label', 'Kembali ke Ringkasan Eksekutif');
    fab.innerHTML = '<span class="hf-ico" aria-hidden="true"><svg><use href="#i-back"/></svg></span>' +
      '<span class="hf-tx">Ringkasan</span>';
    document.body.insertBefore(fab, document.body.firstChild);
  }

  /* ---------- header .d-top dari window.LDETAIL ---------- */
  var cfg = window.LDETAIL;
  var head = document.querySelector('header.d-top');
  if (cfg && head) {
    var esc = function (s) {
      return String(s == null ? '' : s).replace(/[&<>]/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c];
      });
    };
    var crumb = ['Lapduming ke-1'].concat(cfg.crumb || []);
    var lastCrumb = crumb.pop();
    var crumbHtml = crumb.map(function (c) {
      return '<span>' + esc(c) + '</span><span class="cx">›</span>';
    }).join('') + '<b>' + esc(lastCrumb) + '</b>';
    var tagsHtml = (cfg.tags || []).map(function (t) { return '<span>' + t + '</span>'; }).join('');
    head.innerHTML =
      '<div class="d-crumb">' + crumbHtml + '</div>' +
      '<h1>' + esc(cfg.title) + '</h1>' +
      (cfg.sub ? '<p class="d-sub">' + esc(cfg.sub) + '</p>' : '') +
      (tagsHtml ? '<div class="d-tags">' + tagsHtml + '</div>' : '');
  }

  /* ---------- lightbox untuk .bagan-fig ---------- */
  var zooms = document.querySelectorAll('.bagan-fig button.zoom');
  if (zooms.length) {
    var lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML = '<button class="lbx" type="button" aria-label="Tutup gambar">&times;</button><img alt="">';
    document.body.appendChild(lb);
    var img = lb.querySelector('img');
    var close = function () { lb.classList.remove('open'); img.removeAttribute('src'); };
    zooms.forEach(function (b) {
      b.addEventListener('click', function () {
        var im = b.querySelector('img');
        img.src = im.currentSrc || im.src;
        img.alt = im.alt || '';
        lb.classList.add('open');
      });
    });
    lb.querySelector('.lbx').addEventListener('click', close);
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }
})();
