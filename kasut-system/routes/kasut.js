const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Senarai kasut
router.get('/kasut', (req, res) => {
  const kasut = db.prepare(`
    SELECT k.*, v.nama_vendor
    FROM kasut k LEFT JOIN vendor v ON k.vendor_id = v.id
    ORDER BY k.id DESC
  `).all();
  const vendors = db.prepare('SELECT * FROM vendor ORDER BY nama_vendor').all();
  res.render('kasut', { title: 'Jenis Kasut', kasut, vendors });
});

// Tambah kasut
router.post('/kasut', (req, res) => {
  const { brand, model, saiz, harga, stok, vendor_id } = req.body;
  if (!brand || !saiz || !harga) {
    req.flash('error', 'Brand, saiz dan harga diperlukan.');
    return res.redirect('/kasut');
  }
  db.prepare('INSERT INTO kasut (brand, model, saiz, harga, stok, vendor_id) VALUES (?, ?, ?, ?, ?, ?)')
    .run(brand, model, saiz, parseFloat(harga), parseInt(stok) || 0, vendor_id || null);
  req.flash('success', 'Jenis kasut berjaya ditambah.');
  res.redirect('/kasut');
});

// Kemaskini kasut
router.put('/kasut/:id', (req, res) => {
  const { brand, model, saiz, harga, stok, vendor_id } = req.body;
  db.prepare('UPDATE kasut SET brand=?, model=?, saiz=?, harga=?, stok=?, vendor_id=? WHERE id=?')
    .run(brand, model, saiz, parseFloat(harga), parseInt(stok) || 0, vendor_id || null, req.params.id);
  req.flash('success', 'Maklumat kasut dikemaskini.');
  res.redirect('/kasut');
});

// Padam kasut
router.delete('/kasut/:id', (req, res) => {
  db.prepare('DELETE FROM kasut WHERE id=?').run(req.params.id);
  req.flash('success', 'Kasut telah dipadam.');
  res.redirect('/kasut');
});

module.exports = router;
