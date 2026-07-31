# 👟 Sistem Pembelian Kasut (KasutKita)

Sistem pengurusan pembelian kasut berasaskan web, dibina menggunakan **Node.js, Express, EJS & SQLite**. Sesuai untuk tujuan pembelajaran, projek akademik (cth: assignment DBMS), atau asas kepada sistem POS kedai kasut sebenar.

## ✨ Ciri-ciri Utama

- 🔐 **Staff Login** — sistem log masuk staff dengan sesi (session) dan kata laluan disulitkan (bcrypt)
- 👥 **Senarai Customer** — tambah, lihat & padam maklumat pelanggan
- 👟 **Jenis Kasut** — urus brand, model, saiz, harga & stok kasut, dikaitkan dengan vendor
- 🏭 **Senarai Vendor** — urus maklumat pembekal/vendor kasut
- 💳 **Proses Pembayaran** — pilih customer + kasut untuk buat transaksi, stok automatik ditolak, dan resit pembayaran dijana
- 📊 **Dashboard** — ringkasan statistik (jumlah customer, kasut, vendor, transaksi & jualan)
- 🌱 **Data Contoh (Seed)** — data staff, vendor, kasut, customer & transaksi contoh disediakan untuk terus diuji

## 🛠️ Teknologi

| Komponen | Teknologi |
|---|---|
| Backend | Node.js + Express.js |
| Paparan (View) | EJS Template Engine |
| Pangkalan Data | SQLite (better-sqlite3) |
| Auth | express-session + bcryptjs |
| Styling | CSS tersuai (tiada framework) |

## 📁 Struktur Projek

```
kasut-system/
├── db/
│   ├── database.js      # Skema pangkalan data (schema)
│   ├── seed.js           # Data contoh
│   └── kasut.db           # Fail SQLite (auto-dijana, tidak disertakan dalam git)
├── middleware/
│   └── auth.js            # Middleware pengesahan login
├── routes/
│   ├── auth.js             # Login / logout
│   ├── dashboard.js
│   ├── customers.js
│   ├── kasut.js
│   ├── vendors.js
│   └── pembelian.js        # Proses pembayaran & resit
├── views/                  # Templat EJS
├── public/css/style.css
├── server.js                # Entry point
└── package.json
```

## 🚀 Cara Menjalankan

### 1. Clone repo & pasang dependencies

```bash
git clone https://github.com/USERNAME/sistem-pembelian-kasut.git
cd sistem-pembelian-kasut
npm install
```

### 2. Sediakan pangkalan data & data contoh

```bash
npm run seed
```

Ini akan mencipta fail `db/kasut.db` dan mengisi data contoh:

**Akaun Staff (untuk login):**

| Username | Kata Laluan | Jawatan |
|---|---|---|
| `admin` | `admin123` | Pengurus |
| `siti` | `siti123` | Staff Jualan |

**Data contoh lain yang turut disemai:** 4 vendor (Nike, Adidas, Puma, New Balance), 8 jenis kasut (brand, model, saiz & harga), 4 customer, dan 3 rekod transaksi pembelian sebagai contoh proses pembayaran.

### 3. Jalankan server

```bash
npm start
```

Buka pelayar di **http://localhost:3000**

> 💡 Boleh tukar port dengan menetapkan pembolehubah persekitaran `PORT`, cth: `PORT=4000 npm start`. Lihat `.env.example` untuk tetapan lain.

## 🧭 Panduan Penggunaan

1. **Log masuk** menggunakan salah satu akaun staff di atas
2. **Dashboard** memaparkan ringkasan keseluruhan sistem
3. **Senarai Vendor** → tambah pembekal kasut terlebih dahulu
4. **Jenis Kasut** → tambah kasut (brand, model, saiz, harga, stok) dan kaitkan dengan vendor
5. **Senarai Customer** → daftarkan pelanggan
6. **Proses Pembayaran** → pilih customer + kasut + kuantiti + kaedah bayaran → sistem akan:
   - Mengira jumlah bayaran secara automatik
   - Menolak stok kasut mengikut kuantiti dibeli
   - Menjana resit pembayaran yang boleh dicetak

## 🗄️ Skema Pangkalan Data (Ringkas)

- **staff** — id, nama, username, password (hashed), jawatan
- **vendor** — id, nama_vendor, no_telefon, email, alamat
- **kasut** — id, brand, model, saiz, harga, stok, vendor_id (FK)
- **customer** — id, nama, no_telefon, email, alamat
- **pembelian** — id, customer_id (FK), kasut_id (FK), staff_id (FK), kuantiti, harga_seunit, jumlah, kaedah_bayaran, status, tarikh

## 📌 Nota

- Fail `db/kasut.db` **tidak** disertakan dalam repo (lihat `.gitignore`) — jalankan `npm run seed` selepas clone untuk menjananya semula.
- Kata laluan staff disulitkan menggunakan **bcrypt**, bukan disimpan sebagai teks biasa.
- Sistem ini dibina untuk tujuan pembelajaran/demo. Untuk kegunaan produksi, tambahkan langkah keselamatan tambahan (HTTPS, rate-limiting, validasi input lebih ketat, dsb).

## 📄 Lesen

Projek ini dilesenkan di bawah [MIT License](LICENSE).
