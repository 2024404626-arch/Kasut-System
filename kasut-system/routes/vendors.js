const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Senarai vendor
router.get('/vendors', (req, res) => {
  const vendors = db.prepare(`
    SELECT v.*, (SELECT COUNT(*) FROM kasut k WHERE k.vendor_id = v.id) AS jumlah_kasut
    FROM vendor v ORDER BY v.id DESC
  `).all();
  res.render('vendors', { title: 'Senarai Vendor', vendors });
});

// Tambah vendor
router.post('/vendors', (req, res) => {
  const { nama_vendor, no_telefon, email, alamat } = req.body;
  if (!nama_vendor) {
    req.flash('error', 'Nama vendor diperlukan.');
    return res.redirect('/vendors');
  }
  db.prepare('INSERT INTO vendor (nama_vendor, no_telefon, email, alamat) VALUES (?, ?, ?, ?)')
    .run(nama_vendor, no_telefon, email, alamat);
  req.flash('success', 'Vendor berjaya ditambah.');
  res.redirect('/vendors');
});

// Kemaskini vendor
router.put('/vendors/:id', (req, res) => {
  const { nama_vendor, no_telefon, email, alamat } = req.body;
  db.prepare('UPDATE vendor SET nama_vendor=?, no_telefon=?, email=?, alamat=? WHERE id=?')
    .run(nama_vendor, no_telefon, email, alamat, req.params.id);
  req.flash('success', 'Maklumat vendor dikemaskini.');
  res.redirect('/vendors');
});

// Padam vendor
router.delete('/vendors/:id', (req, res) => {
  db.prepare('DELETE FROM vendor WHERE id=?').run(req.params.id);
  req.flash('success', 'Vendor telah dipadam.');
  res.redirect('/vendors');
});

module.exports = router;
