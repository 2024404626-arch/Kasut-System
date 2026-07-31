const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const path = require('path');
require('./db/database'); // pastikan skema dicipta

const { pastikanLogin } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// ---------- VIEW ENGINE ----------
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ---------- MIDDLEWARE ----------
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET || 'rahsia-sistem-kasut-uitm',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 4 } // 4 jam
}));
app.use(flash());

// Boleh guna staff & mesej flash terus dalam semua view
app.use((req, res, next) => {
  res.locals.staff = req.session.staff || null;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.currentPath = req.path;
  next();
});

// ---------- ROUTES ----------
app.use('/', require('./routes/auth'));

app.get('/', (req, res) => res.redirect(req.session.staff ? '/dashboard' : '/login'));

app.use('/', pastikanLogin, require('./routes/dashboard'));
app.use('/', pastikanLogin, require('./routes/customers'));
app.use('/', pastikanLogin, require('./routes/kasut'));
app.use('/', pastikanLogin, require('./routes/vendors'));
app.use('/', pastikanLogin, require('./routes/pembelian'));

// ---------- 404 ----------
app.use((req, res) => {
  res.status(404).render('404', { title: 'Halaman Tidak Dijumpai' });
});

app.listen(PORT, () => {
  console.log(`🚀 Sistem Pembelian Kasut berjalan di http://localhost:${PORT}`);
});
