const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const db = require('../db/database');
const { pastikanBelumLogin } = require('../middleware/auth');

router.get('/login', pastikanBelumLogin, (req, res) => {
  res.render('login', { title: 'Log Masuk Staff' });
});

router.post('/login', pastikanBelumLogin, (req, res) => {
  const { username, password } = req.body;
  const staff = db.prepare('SELECT * FROM staff WHERE username = ?').get(username);

  if (!staff || !bcrypt.compareSync(password, staff.password)) {
    req.flash('error', 'Username atau kata laluan tidak sah.');
    return res.redirect('/login');
  }

  req.session.staff = { id: staff.id, nama: staff.nama, username: staff.username, jawatan: staff.jawatan };
  req.flash('success', `Selamat kembali, ${staff.nama}!`);
  res.redirect('/dashboard');
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

module.exports = router;
