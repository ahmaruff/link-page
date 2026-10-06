# Web 101: Build Your Own Link Page

Belajar fundamental web development dari nol dengan membangun satu project: **website link in bio** ala Linktree, dari halaman kosong sampai live di internet.

🔗 **Contoh hasil akhir:** https://ahmaruff.github.io/link-page/

## 📚 Materi Belajar

Seluruh materi (penjelasan, langkah-langkah, snippet, hint, dan latihan) ada di Notion:

### 👉 [Buka materi di Notion](https://universal-magpie-c9c.notion.site/Web-101-Build-Your-Own-Link-in-Bio-3ef2eddec75280b9878bfc6368b08376?pvs=143)

Repo ini adalah **pendamping materi**: berisi kode contoh dan **checkpoint** di tiap tahap, supaya kamu bisa melanjutkan belajar walau sempat tertinggal.

## Tentang Kelas

Kelas ini mengenalkan fundamental web development dari sisi **frontend**. Kamu akan belajar bagaimana website sampai ke browser, menulis HTML semantik, menata tampilan dengan Tailwind CSS, membuat halaman interaktif dengan JavaScript, lalu membedah ide di balik framework modern seperti React, **tanpa harus setup React**.

- **Format:** 4 pertemuan, 2–3 jam per pertemuan
- **Metode:** *project-based learning*. Satu project dibangun bertahap dari awal sampai live
- **Untuk siapa:** pemula di web development yang sudah nyaman dengan komputer, code editor, Git dasar, dan konsep dasar pemrograman (variabel, percabangan, perulangan)

## Yang Kamu Pelajari

| Pertemuan | Tema | Checkpoint |
|---|---|---|
| 1 | Cara kerja web, tooling, deploy pertama, dan HTML semantik | `p1a-hello`, `p1b-html` |
| 2 | Tailwind CSS, responsive, dan dark mode | `p2a-tailwind`, `p2b-responsive` |
| 3 | JavaScript dan DOM: data → UI, filter, toggle tema | `p3-js-dom` |
| 4 | Dari vanilla ke tiny React, `fetch` dan API, deploy final | `p4a-manual`, `p4b-state`, `p4b-state-fetch` |

Di akhir, kamu bisa:
- menjelaskan bagaimana sebuah website bekerja (client, server, HTTP),
- menulis halaman dengan HTML semantik dan menatanya dengan Tailwind CSS,
- membuat halaman interaktif dengan JavaScript dan DOM,
- memahami konsep dasar di balik React (`UI = f(state)`, komponen, state),
- mempublikasikan website ke GitHub Pages.

## Struktur Repo

```
.
├── index.html, script.js, avatar.svg, data/   # versi final (= checkpoints/p4b-state)
├── checkpoints/
│   ├── p1a-hello/         # Pertemuan 1: halaman Hello
│   ├── p1b-html/          # Pertemuan 1: link page dengan HTML semantik
│   ├── p2a-tailwind/      # Pertemuan 2: styling dengan Tailwind
│   ├── p2b-responsive/    # Pertemuan 2: responsive + dark mode
│   ├── p3-js-dom/         # Pertemuan 3: JavaScript dan DOM
│   ├── p4a-manual/        # Pertemuan 4: fitur baru dengan cara manual (masalah)
│   └── p4b-state/         # Pertemuan 4: pola state → render (solusi, versi final)
└── README.md
```

Setiap folder checkpoint **berdiri sendiri** dan bisa langsung dijalankan.

## Cara Memakai Repo Ini

**Saat belajar:** bangun project-mu sendiri di repository-mu, mengikuti langkah di Notion. Repo ini hanya acuan.

**Kalau tertinggal:** salin isi folder checkpoint terakhir yang sudah kamu selesaikan ke folder project-mu, lalu lanjutkan dari langkah berikutnya di Notion. Contoh: tertinggal di Pertemuan 2 Blok B, salin isi `checkpoints/p2a-tailwind/`.

**Mengambil repo ini:**

```bash
git clone https://github.com/ahmaruff/link-page.git
```

Atau klik **Code → Download ZIP** di halaman repository.

## Cara Menjalankan

1. Buka folder (root atau salah satu checkpoint) dengan **VS Code**.
2. Pasang ekstensi **Live Server**.
3. Klik kanan `index.html` → **Open with Live Server**.

> ⚠️ Jangan membuka `index.html` langsung dengan klik dua kali (`file://`). Mulai `p4b-state`, halaman memakai `fetch` untuk membaca `data/links.json`, dan itu butuh server.

## Teknologi

- HTML
- [Tailwind CSS](https://tailwindcss.com) (via CDN, tanpa build tool)
- JavaScript (vanilla, tanpa framework atau library)
- GitHub Pages untuk hosting

## Persiapan Sebelum Mulai

Pastikan kamu sudah menyiapkan: Google Chrome, VS Code (+ Live Server), Git, dan akun GitHub. Panduan lengkap ada di halaman **Setup Guide** di [Notion](https://universal-magpie-c9c.notion.site/Web-101-Build-Your-Own-Link-in-Bio-3ef2eddec75280b9878bfc6368b08376?pvs=143).

## Lisensi

[Pilih lisensi, misalnya MIT untuk kode. Jika materi di Notion memiliki lisensi berbeda, sebutkan di sini.]

## Kontak

Dibuat oleh [@ahmaruff](https://github.com/ahmaruff)