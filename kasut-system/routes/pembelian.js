const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Halaman proses pembayaran + senarai transaksi
router.get('/pembelian', (req, res) => {
  const customers = db.prepare('SELECT * FROM customer ORDER BY nama').all();
  const kasut = db.prepare('SELECT * FROM kasut WHERE stok > 0 ORDER BY brand').all();

  const transaksi = db.prepare(`
    SELECT p.*, c.nama AS nama_customer, k.brand, k.model, k.saiz, s.nama AS nama_staff
    FROM pembelian p
    JOIN customer c ON p.customer_id = c.id
    JOIN kasut k ON p.kasut_id = k.id
    JOIN staff s ON p.staff_id = s.id
    ORDER BY p.id DESC
  `).all();

  res.render('pembelian', { title: 'Proses Pembayaran', customers, kasut, transaksi });
});

// Proses pembayaran baru
router.post('/pembelian', (req, res) => {
  const { customer_id, kasut_id, kuantiti, kaedah_bayaran } = req.body;
  const qty = parseInt(kuantiti) || 1;

  const item = db.prepare('SELECT * FROM kasut WHERE id = ?').get(kasut_id);
  if (!item) {
    req.flash('error', 'Kasut tidak dijumpai.');
    return res.redirect('/pembelian');
  }
  if (item.stok < qty) {
    req.flash('error', `Stok tidak mencukupi. Baki stok: ${item.stok}`);
    return res.redirect('/pembelian');
  }

  const jumlah = item.harga * qty;
  const staffId = req.session.staff.id;

  const insert = db.prepare(`
    INSERT INTO pembelian (customer_id, kasut_id, staff_id, kuantiti, harga_seunit, jumlah, kaedah_bayaran, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, 'Selesai')
  `);
  const result = insert.run(customer_id, kasut_id, staffId, qty, item.harga, jumlah, kaedah_bayaran);

  db.prepare('UPDATE kasut SET stok = stok - ? WHERE id = ?').run(qty, kasut_id);

  req.flash('success', `Pembayaran berjaya diproses! Jumlah: RM${jumlah.toFixed(2)}`);
  res.redirect(`/pembelian/resit/${result.lastInsertRowid}`);
});

// Resit pembayaran
router.get('/pembelian/resit/:id', (req, res) => {
  const resit = db.prepare(`
    SELECT p.*, c.nama AS nama_customer, c.no_telefon, c.alamat,
           k.brand, k.model, k.saiz, s.nama AS nama_staff
    FROM pembelian p
    JOIN customer c ON p.customer_id = c.id
    JOIN kasut k ON p.kasut_id = k.id
    JOIN staff s ON p.staff_id = s.id
    WHERE p.id = ?
  `).get(req.params.id);

  if (!resit) {
    req.flash('error', 'Resit tidak dijumpai.');
    return res.redirect('/pembelian');
  }

  res.render('resit', { title: 'Resit Pembayaran', resit });
});

module.exports = router;
