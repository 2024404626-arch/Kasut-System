const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/dashboard', (req, res) => {
  const jumlahCustomer = db.prepare('SELECT COUNT(*) AS c FROM customer').get().c;
  const jumlahKasut = db.prepare('SELECT COUNT(*) AS c FROM kasut').get().c;
  const jumlahVendor = db.prepare('SELECT COUNT(*) AS c FROM vendor').get().c;
  const jumlahJualan = db.prepare('SELECT COALESCE(SUM(jumlah),0) AS t FROM pembelian').get().t;
  const jumlahTransaksi = db.prepare('SELECT COUNT(*) AS c FROM pembelian').get().c;

  const transaksiTerkini = db.prepare(`
    SELECT p.*, c.nama AS nama_customer, k.brand, k.model, k.saiz, s.nama AS nama_staff
    FROM pembelian p
    JOIN customer c ON p.customer_id = c.id
    JOIN kasut k ON p.kasut_id = k.id
    JOIN staff s ON p.staff_id = s.id
    ORDER BY p.id DESC LIMIT 5
  `).all();

  res.render('dashboard', {
    title: 'Dashboard',
    jumlahCustomer, jumlahKasut, jumlahVendor, jumlahJualan, jumlahTransaksi,
    transaksiTerkini
  });
});

module.exports = router;
