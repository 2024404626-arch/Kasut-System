const bcrypt = require('bcryptjs');
const db = require('./database');

console.log('🌱 Menyemai data contoh...');

// ---------- STAFF ----------
const staffCount = db.prepare('SELECT COUNT(*) AS c FROM staff').get().c;
if (staffCount === 0) {
  const insertStaff = db.prepare(
    'INSERT INTO staff (nama, username, password, jawatan) VALUES (?, ?, ?, ?)'
  );
  const staffs = [
    ['Ahmad Zulkarnain', 'admin', 'admin123', 'Pengurus'],
    ['Siti Nur Aisyah', 'siti', 'siti123', 'Staff Jualan'],
  ];
  for (const [nama, username, password, jawatan] of staffs) {
    const hashed = bcrypt.hashSync(password, 10);
    insertStaff.run(nama, username, hashed, jawatan);
  }
  console.log('✔ Staff contoh ditambah (admin/admin123, siti/siti123)');
}

// ---------- VENDOR ----------
const vendorCount = db.prepare('SELECT COUNT(*) AS c FROM vendor').get().c;
if (vendorCount === 0) {
  const insertVendor = db.prepare(
    'INSERT INTO vendor (nama_vendor, no_telefon, email, alamat) VALUES (?, ?, ?, ?)'
  );
  const vendors = [
    ['Nike Malaysia Sdn Bhd', '03-2178 5566', 'sales@nike-my.com', 'Kuala Lumpur, WP'],
    ['Adidas Distribution MY', '03-7987 1234', 'orders@adidas-my.com', 'Petaling Jaya, Selangor'],
    ['Puma Trading Sdn Bhd', '04-263 9911', 'info@puma-trading.com', 'Georgetown, Pulau Pinang'],
    ['New Balance Asia', '07-334 5678', 'contact@nbasia.com', 'Johor Bahru, Johor'],
  ];
  for (const v of vendors) insertVendor.run(...v);
  console.log('✔ Vendor contoh ditambah');
}

// ---------- KASUT ----------
const kasutCount = db.prepare('SELECT COUNT(*) AS c FROM kasut').get().c;
if (kasutCount === 0) {
  const insertKasut = db.prepare(
    'INSERT INTO kasut (brand, model, saiz, harga, stok, vendor_id) VALUES (?, ?, ?, ?, ?, ?)'
  );
  const kasuts = [
    ['Nike', 'Air Max 270', '8', 429.00, 15, 1],
    ['Nike', 'Revolution 6', '9', 199.00, 25, 1],
    ['Adidas', 'Ultraboost 22', '9', 599.00, 10, 2],
    ['Adidas', 'Samba OG', '10', 349.00, 20, 2],
    ['Puma', 'Suede Classic', '8', 259.00, 18, 3],
    ['Puma', 'RS-X', '7', 379.00, 12, 3],
    ['New Balance', '574', '9', 329.00, 14, 4],
    ['New Balance', '990v5', '10', 699.00, 8, 4],
  ];
  for (const k of kasuts) insertKasut.run(...k);
  console.log('✔ Jenis kasut contoh ditambah');
}

// ---------- CUSTOMER ----------
const custCount = db.prepare('SELECT COUNT(*) AS c FROM customer').get().c;
if (custCount === 0) {
  const insertCust = db.prepare(
    'INSERT INTO customer (nama, no_telefon, email, alamat) VALUES (?, ?, ?, ?)'
  );
  const customers = [
    ['Muhammad Aiman', '012-3456789', 'aiman@example.com', 'Shah Alam, Selangor'],
    ['Nurul Huda', '013-9876543', 'huda@example.com', 'Klang, Selangor'],
    ['Kamal Hassan', '019-2233445', 'kamal@example.com', 'Ampang, KL'],
    ['Farah Aina', '017-6655443', 'farah@example.com', 'Subang Jaya, Selangor'],
  ];
  for (const c of customers) insertCust.run(...c);
  console.log('✔ Customer contoh ditambah');
}

// ---------- PEMBELIAN (contoh proses pembayaran) ----------
const belianCount = db.prepare('SELECT COUNT(*) AS c FROM pembelian').get().c;
if (belianCount === 0) {
  const insertBelian = db.prepare(
    `INSERT INTO pembelian (customer_id, kasut_id, staff_id, kuantiti, harga_seunit, jumlah, kaedah_bayaran, status, tarikh)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  );
  insertBelian.run(1, 1, 1, 1, 429.00, 429.00, 'Kad Debit', 'Selesai', '2026-07-20 10:15:00');
  insertBelian.run(2, 3, 2, 1, 599.00, 599.00, 'Tunai', 'Selesai', '2026-07-25 14:30:00');
  insertBelian.run(3, 5, 1, 2, 259.00, 518.00, 'E-Wallet', 'Selesai', '2026-07-28 16:45:00');
  console.log('✔ Rekod pembelian contoh ditambah');
}

console.log('🎉 Selesai menyemai data.');
