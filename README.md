<div align="center">

# 🔥 Lofi Campfire Studio

**Api unggun, bintang, dan musik untuk menemanimu belajar.**
*A cozy lofi campfire with an animated night scene, ambient mixer, and a player for your own links.*

[![Live Demo](https://img.shields.io/badge/▶_Live_Demo-ff8a3d?style=for-the-badge)](https://USERNAME.github.io/NAMA-REPO/)
![HTML](https://img.shields.io/badge/HTML5-e34f26?style=flat-square&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572b6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-f7df1e?style=flat-square&logo=javascript&logoColor=black)
![No build](https://img.shields.io/badge/no_build-zero_dependencies-6ee7b7?style=flat-square)

<!-- Ganti dengan screenshot/GIF kamu: unggah gambar ke repo lalu ubah nama file di bawah -->
<img src="preview.png" alt="Preview Lofi Campfire Studio" width="820">

</div>

---

## ✨ Fitur

| | |
|---|---|
| 🎨 **Pemandangan hidup** | Langit berbintang, aurora, bintang jatuh, gunung berlapis dengan efek parallax mengikuti kursor, pohon yang bergoyang ditiup angin |
| 🔥 **Api unggun nyata** | Partikel api, bara, dan asap yang menyinari sekitarnya |
| 🧑‍🎤 **Karakter & teman** | Gitaris yang memetik dan bernyanyi, teman yang menyeruput minuman, kucing yang tidur, burung hantu yang mengikuti kursor |
| 🌙 **3 tema** | Malam berbintang · Senja hangat · Malam bersalju |
| 🎚️ **Ambient mixer** | Hujan, api unggun, dan angin malam, dengan volume terpisah. Bisa di-minimize |
| 🎵 **Pemutar dari link** | Tempel link **YouTube**, **Spotify**, atau **audio langsung** (.mp3 .m4a .ogg .wav), atau pilih file dari perangkat |
| ⬇️ **Unduh** | Untuk audio langsung dan file perangkat |
| 📱 **Responsif** | Nyaman dibuka di HP maupun desktop |

## 🚀 Cara menjalankan

> [!IMPORTANT]
> Player YouTube **tidak jalan** jika `index.html` dibuka langsung dari file (`file:///`). YouTube menolak embed tanpa alamat `http(s)` yang valid (*Error 153*). Jalankan lewat server lokal.

**Windows** → klik dua kali `serve.bat`
**Mac / Linux** → `sh serve.sh`
**Manual** → `python -m http.server 8000`

Lalu buka **http://localhost:8000**

## 🌐 Deploy ke GitHub Pages

1. Unggah semua isi folder ini ke repository **Public**
2. **Settings → Pages → Deploy from a branch → `main` / `(root)` → Save**
3. Tunggu 1-2 menit, situs live di `https://USERNAME.github.io/NAMA-REPO/`

Bisa juga di-deploy ke Netlify atau Vercel. Tidak perlu build.

## 🗂️ Struktur proyek

```
lofi-campfire-studio/
├── index.html        # kerangka halaman & UI
├── css/
│   └── style.css     # tampilan (glass UI, panel, mixer)
├── js/
│   ├── scene.js      # canvas: langit, gunung, api, karakter, kucing, burung hantu, tema
│   ├── audio.js      # suara ambient (hujan, api, angin) via Web Audio
│   └── player.js     # pemutar link YouTube / Spotify / audio, unduh, antrean
├── serve.sh          # server lokal (Mac/Linux)
└── serve.bat         # server lokal (Windows)
```

> Urutan `<script>` di `index.html` harus tetap: `scene.js` → `audio.js` → `player.js`. Ketiganya berbagi variabel global.

## 🎛️ Kustomisasi cepat

| Ingin mengubah… | Edit di… |
|---|---|
| Warna langit, gunung, dan tema | objek `TH` di `js/scene.js` |
| Tampilan karakter | fungsi `person()` di `js/scene.js` |
| Kucing & burung hantu | fungsi `cat()` dan `owl()` di `js/scene.js` |
| Volume dasar suara ambient | array `SC` di `js/audio.js` |
| Warna aksen & gaya panel | variabel `:root` di `css/style.css` |

## ❓ Tanya jawab

<details>
<summary><b>Kenapa YouTube menampilkan "Error 153"?</b></summary>

Halaman dibuka dari `file:///` atau dari lingkungan yang tidak mengirim asal halaman. Jalankan lewat server lokal (lihat di atas) atau deploy ke GitHub Pages. Jika masih error, video tersebut mungkin melarang disematkan. Pakai tombol **↗ Buka di YouTube** di bawah player.
</details>

<details>
<summary><b>Bisakah mengunduh lagu dari YouTube / Spotify?</b></summary>

Tidak. Itu melanggar ketentuan layanan dan hak cipta mereka. Unduhan hanya tersedia untuk link audio langsung dan file dari perangkatmu.
</details>

<details>
<summary><b>Link .mp3 tidak bisa diunduh?</b></summary>

Sebagian situs memblokir pengunduhan lintas-situs (CORS). Jika gagal, link otomatis dibuka di tab baru, lalu simpan dari sana.
</details>

## 📸 Menambahkan screenshot

Ambil tangkapan layar atau rekam GIF, simpan sebagai `preview.png`, lalu unggah ke root repository. Gambar akan muncul otomatis di bagian atas README ini.

---

<div align="center">

Dibuat dengan 🔥 dan lagu favorit · Silakan fork dan modifikasi

</div>
