# Lofi Campfire Studio

Web lofi bergaya api unggun malam: pemandangan animasi canvas, mixer suara ambient, dan pemutar musik dari link.

## Struktur

```
lofi-campfire-studio/
├── index.html        # kerangka halaman & UI
├── css/
│   └── style.css     # tampilan (glass UI, panel, mixer)
├── js/
│   ├── scene.js      # canvas: langit, gunung, api, karakter, kucing, burung hantu, tema
│   ├── audio.js      # suara ambient (hujan, api, angin) via Web Audio
│   └── player.js     # pemutar link YouTube / Spotify / audio, unduh, antrean, UI
├── serve.sh          # server lokal (Mac/Linux)
├── serve.bat         # server lokal (Windows)
└── README.md
```

Urutan `<script>` di `index.html` harus tetap: `scene.js` → `audio.js` → `player.js`
(ketiganya berbagi variabel global seperti `playing`, `mode`, `rain`, `wind`).

## Cara menjalankan

Player YouTube **tidak berfungsi** jika halaman dibuka langsung dari file (`file:///`), karena YouTube
menolak embed tanpa alamat http(s) yang valid (Error 153). Jalankan lewat server lokal:

- Windows: klik dua kali `serve.bat`
- Mac/Linux: `sh serve.sh`
- atau manual: `python -m http.server 8000`

Lalu buka http://localhost:8000.

## Deploy gratis

Unggah folder ini ke Netlify (drag & drop), GitHub Pages, atau Vercel. Tidak perlu build.

## Fitur

- Tempel link YouTube, Spotify, atau audio langsung (.mp3/.m4a/.ogg/.wav), atau pilih file dari perangkat.
- Unduh hanya untuk audio langsung dan file perangkat (YouTube/Spotify tidak bisa diunduh).
- Tombol "Buka di YouTube/Spotify" jika embed bermasalah.
- Tema: Malam berbintang, Senja, Malam bersalju.
- Mixer ambient yang bisa di-minimize.

## Kustomisasi cepat

- Warna & tema langit: objek `TH` di `js/scene.js`
- Karakter: fungsi `person()` di `js/scene.js`
- Volume dasar suara: array `SC` di `js/audio.js`
