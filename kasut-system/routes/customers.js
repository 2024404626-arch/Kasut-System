const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Senarai customer
router.get('/customers', (req, res) => {
  const customers = db.prepare('SELECT * FROM customer ORDER BY id DESC').all();
  res.render('customers', { title: 'Senarai Customer', customers });
});

// Tambah customer
router.post('/customers', (req, res) => {
  const { nama, no_telefon, email, alamat } = req.body;
  if (!nama) {
    req.flash('error', 'Nama customer diperlukan.');
    return res.redirect('/customers');
  }
  db.prepare('INSERT INTO customer (nama, no_telefon, email, alamat) VALUES (?, ?, ?, ?)')
    .run(nama, no_telefon, email, alamat);
  req.flash('success', 'Customer berjaya ditambah.');
  res.redirect('/customers');
});

// Kemaskini customer
router.put('/customers/:id', (req, res) => {
  const { nama, no_telefon, email, alamat } = req.body;
  db.prepare('UPDATE customer SET nama=?, no_telefon=?, email=?, alamat=? WHERE id=?')
    .run(nama, no_telefon, email, alamat, req.params.id);
  req.flash('success', 'Maklumat customer dikemaskini.');
  res.redirect('/customers');
});

// Padam customer
router.delete('/customers/:id', (req, res) => {
  db.prepare('DELETE FROM customer WHERE id=?').run(req.params.id);
  req.flash('success', 'Customer telah dipadam.');
  res.redirect('/customers');
});

module.exports = router;
