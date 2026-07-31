const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, 'kasut.db');
const db = new Database(dbPath);

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// ---------- SCHEMA ----------
db.exec(`
CREATE TABLE IF NOT EXISTS staff (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nama TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  jawatan TEXT DEFAULT 'Staff',
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS vendor (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nama_vendor TEXT NOT NULL,
  no_telefon TEXT,
  email TEXT,
  alamat TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS kasut (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  brand TEXT NOT NULL,
  model TEXT,
  saiz TEXT NOT NULL,
  harga REAL NOT NULL,
  stok INTEGER DEFAULT 0,
  vendor_id INTEGER,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (vendor_id) REFERENCES vendor(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS customer (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nama TEXT NOT NULL,
  no_telefon TEXT,
  email TEXT,
  alamat TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS pembelian (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_id INTEGER NOT NULL,
  kasut_id INTEGER NOT NULL,
  staff_id INTEGER NOT NULL,
  kuantiti INTEGER NOT NULL DEFAULT 1,
  harga_seunit REAL NOT NULL,
  jumlah REAL NOT NULL,
  kaedah_bayaran TEXT NOT NULL,
  status TEXT DEFAULT 'Selesai',
  tarikh TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (customer_id) REFERENCES customer(id),
  FOREIGN KEY (kasut_id) REFERENCES kasut(id),
  FOREIGN KEY (staff_id) REFERENCES staff(id)
);
`);

module.exports = db;
