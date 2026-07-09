# Dengar Jiwa

> Platform kesehatan mental untuk konsultasi psikolog profesional — aman, mudah, dan terpercaya.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

---

## Daftar Isi

- [Tentang Proyek](#tentang-proyek)
- [Fitur](#fitur)
- [Tech Stack](#tech-stack)
- [Prasyarat](#prasyarat)
- [Instalasi](#instalasi)
- [Variabel Lingkungan](#variabel-lingkungan)
- [Menjalankan Aplikasi](#menjalankan-aplikasi)
- [Struktur Proyek](#struktur-proyek)
- [API](#api)
- [Panel Admin](#panel-admin)
- [Skrip yang Tersedia](#skrip-yang-tersedia)
- [Kontribusi](#kontribusi)

---

## Tentang Proyek

**Dengar Jiwa** adalah aplikasi web full-stack yang menghubungkan pengguna dengan psikolog profesional. Pengguna dapat menjelajahi layanan, memilih psikolog, melakukan booking konsultasi online, serta membaca artikel kesehatan mental. Admin dapat mengelola seluruh konten dan pemesanan melalui panel khusus.

Aplikasi ini dibangun dengan **Next.js App Router**, menyediakan landing page publik, alur booking multi-langkah, REST API internal, dan dashboard admin terproteksi.

---

## Fitur

### Publik

- **Landing page** — hero, layanan, cara kerja, daftar psikolog, testimoni, dan artikel
- **Booking online** — wizard multi-langkah: pilih layanan → psikolog → jadwal → data diri → pembayaran
- **Autentikasi pengguna** — registrasi dan login akun
- **Responsif** — dioptimalkan untuk desktop dan perangkat mobile

### Admin (`/adminJiwa`)

- **Dashboard** — ringkasan statistik dan booking terbaru
- **Manajemen booking** — lihat dan perbarui status pemesanan
- **Manajemen psikolog** — CRUD data psikolog
- **Manajemen testimoni** — CRUD ulasan klien
- **Manajemen artikel** — CRUD konten edukasi kesehatan mental
- **Proteksi rute** — middleware autentikasi berbasis cookie

---

## Tech Stack

| Kategori | Teknologi |
|----------|-----------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| UI Library | [React 19](https://react.dev/) |
| Bahasa | [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) |
| Font | Inter, Playfair Display |
| Linting | ESLint + eslint-config-next |

---

## Prasyarat

Pastikan lingkungan pengembangan Anda sudah terpasang:

- **Node.js** ≥ 18.18
- **npm**, **pnpm**, **yarn**, atau **bun**

---

## Instalasi

```bash
# Clone repositori
git clone https://github.com/<username>/psikolog-apps.git
cd psikolog-apps

# Instal dependensi
npm install
```

---

## Variabel Lingkungan

Salin file contoh (jika tersedia) atau buat `.env` di root proyek:

```env
# API (opsional — default ke /api)
NEXT_PUBLIC_API_BASE_URL=/api
NEXT_PUBLIC_API_TIMEOUT=30000

# Kredensial admin panel
ADMIN_EMAIL=admin@dengarjiwa.com
ADMIN_PASSWORD=admin123
ADMIN_SESSION_TOKEN=dj-admin-authenticated
```

| Variabel | Wajib | Default | Keterangan |
|----------|-------|---------|------------|
| `NEXT_PUBLIC_API_BASE_URL` | Tidak | `/api` | Base URL untuk client API |
| `NEXT_PUBLIC_API_TIMEOUT` | Tidak | `30000` | Timeout request (ms) |
| `ADMIN_EMAIL` | Tidak | `admin@dengarjiwa.com` | Email login admin |
| `ADMIN_PASSWORD` | Tidak | `admin123` | Password login admin |
| `ADMIN_SESSION_TOKEN` | Tidak | `dj-admin-authenticated` | Token sesi admin |

> **Peringatan keamanan:** Ganti nilai default kredensial admin sebelum deploy ke production.

---

## Menjalankan Aplikasi

```bash
# Mode development
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

```bash
# Build production
npm run build

# Jalankan build production
npm start
```

| URL | Deskripsi |
|-----|-----------|
| `/` | Landing page |
| `/booking` | Alur pemesanan konsultasi |
| `/booking/success` | Konfirmasi booking berhasil |
| `/adminJiwa` | Login panel admin |
| `/adminJiwa/dashboard` | Dashboard admin |

---

## Struktur Proyek

```
psikolog-apps/
├── app/
│   ├── api/                  # REST API routes
│   │   ├── auth/             # Login, register, logout (user & admin)
│   │   ├── bookings/         # CRUD pemesanan
│   │   ├── psychologists/    # CRUD psikolog
│   │   ├── services/         # Data layanan
│   │   ├── testimonials/     # CRUD testimoni
│   │   └── articles/         # CRUD artikel
│   ├── adminJiwa/            # Panel admin
│   │   └── (panel)/          # Halaman terproteksi (dashboard, CRUD)
│   ├── booking/              # Halaman booking
│   ├── layout.tsx            # Root layout & metadata
│   └── page.tsx              # Landing page
├── components/
│   ├── admin/                # Komponen panel admin
│   ├── booking/              # Wizard & stepper booking
│   └── ...                   # Header, Hero, Footer, dll.
├── lib/
│   ├── api/                  # Client API, endpoints, store in-memory
│   ├── auth/                 # Utilitas autentikasi admin
│   └── data.ts               # Data statis & helper
├── middleware.ts             # Proteksi rute admin
└── public/                   # Aset statis
```

---

## API

Semua endpoint tersedia di bawah `/api`. Client API terpusat di `lib/api/` dengan konstanta endpoint di `lib/api/endpoints.ts`.

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| `POST` | `/api/auth/login` | Login pengguna |
| `POST` | `/api/auth/register` | Registrasi pengguna |
| `POST` | `/api/auth/logout` | Logout pengguna |
| `POST` | `/api/auth/admin/login` | Login admin |
| `POST` | `/api/auth/admin/logout` | Logout admin |
| `GET/POST` | `/api/bookings` | Daftar & buat booking |
| `GET/PATCH/DELETE` | `/api/bookings/:id` | Detail & update booking |
| `GET/POST` | `/api/psychologists` | Daftar & tambah psikolog |
| `GET/PATCH/DELETE` | `/api/psychologists/:id` | Detail & update psikolog |
| `GET` | `/api/services` | Daftar layanan |
| `GET/POST` | `/api/testimonials` | Daftar & tambah testimoni |
| `GET/POST` | `/api/articles` | Daftar & tambah artikel |

> Data saat ini disimpan di **in-memory store** (`lib/api/store/`). Cocok untuk development dan demo; untuk production, integrasikan dengan database.

---

## Panel Admin

1. Buka `/adminJiwa`
2. Masuk dengan kredensial dari variabel lingkungan
3. Setelah login, Anda diarahkan ke `/adminJiwa/dashboard`

Middleware (`middleware.ts`) memastikan semua rute di bawah `/adminJiwa/*` hanya dapat diakses setelah autentikasi.

---

## Skrip yang Tersedia

| Perintah | Deskripsi |
|----------|-----------|
| `npm run dev` | Jalankan server development |
| `npm run build` | Build aplikasi untuk production |
| `npm start` | Jalankan server production |
| `npm run lint` | Jalankan ESLint |

---

## Kontribusi

Kontribusi sangat diterima! Ikuti langkah berikut:

1. **Fork** repositori ini
2. Buat branch fitur: `git checkout -b fitur/nama-fitur`
3. Commit perubahan: `git commit -m "feat: tambahkan fitur X"`
4. Push ke branch: `git push origin fitur/nama-fitur`
5. Buka **Pull Request**

### Panduan

- Ikuti konvensi kode yang sudah ada di proyek
- Pastikan `npm run lint` dan `npm run build` berjalan tanpa error
- Tulis commit message yang jelas dan deskriptif

---

<p align="center">
  Dibuat dengan ❤️ untuk kesehatan mental Indonesia
</p>
