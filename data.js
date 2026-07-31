:root {
  --navy: #1b2a4a;
  --navy-dark: #121e36;
  --clay: #c8622e;
  --clay-light: #e8935f;
  --cream: #f7f4ee;
  --ink: #23262b;
  --grey: #6b7280;
  --border: #e3ddd1;
  --green: #2f7a4f;
  --red: #b3432b;
  --radius: 10px;
  --font-display: 'Poppins', 'Segoe UI', sans-serif;
  --font-body: 'Inter', 'Segoe UI', sans-serif;
}

* { box-sizing: border-box; }

body {
  margin: 0;
  font-family: var(--font-body);
  background: var(--cream);
  color: var(--ink);
}

a { color: inherit; text-decoration: none; }

/* ---------- LOGIN ---------- */
.login-wrap {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    radial-gradient(circle at 15% 20%, rgba(200,98,46,0.18), transparent 45%),
    radial-gradient(circle at 85% 80%, rgba(27,42,74,0.25), transparent 45%),
    var(--navy-dark);
  padding: 20px;
}

.login-card {
  background: var(--cream);
  width: 100%;
  max-width: 400px;
  border-radius: var(--radius);
  padding: 40px 36px;
  box-shadow: 0 30px 60px rgba(0,0,0,0.35);
}

.login-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
}

.login-brand .icon {
  width: 40px; height: 40px;
  background: var(--clay);
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  font-size: 20px;
}

.login-brand h1 {
  font-family: var(--font-display);
  font-size: 20px;
  margin: 0;
  color: var(--navy);
}

.login-card p.sub {
  color: var(--grey);
  margin: 0 0 28px;
  font-size: 14px;
}

.login-hint {
  margin-top: 20px;
  font-size: 12.5px;
  color: var(--grey);
  background: #fff;
  border: 1px dashed var(--border);
  border-radius: 8px;
  padding: 10px 12px;
}

/* ---------- LAYOUT ---------- */
.app-shell { display: flex; min-height: 100vh; }

.sidebar {
  width: 230px;
  background: var(--navy-dark);
  color: #fff;
  padding: 24px 16px;
  flex-shrink: 0;
}

.sidebar .brand {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 17px;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 30px;
  color: #fff;
}
.sidebar .brand .dot { color: var(--clay-light); }

.sidebar nav a {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 8px;
  color: rgba(255,255,255,0.75);
  font-size: 14px;
  margin-bottom: 4px;
  transition: background .15s, color .15s;
}
.sidebar nav a:hover { background: rgba(255,255,255,0.06); color: #fff; }
.sidebar nav a.active { background: var(--clay); color: #fff; font-weight: 600; }

.sidebar .staff-box {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid rgba(255,255,255,0.12);
  font-size: 13px;
}
.sidebar .staff-box .nama { font-weight: 600; }
.sidebar .staff-box .jawatan { color: rgba(255,255,255,0.55); font-size: 12px; }
.sidebar .staff-box form { margin-top: 10px; }
.sidebar .staff-box button {
  width: 100%;
  background: rgba(255,255,255,0.08);
  border: none;
  color: #fff;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
}
.sidebar .staff-box button:hover { background: var(--clay); }

.main { flex: 1; padding: 30px 36px; max-width: 1200px; }

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 22px;
  flex-wrap: wrap;
  gap: 10px;
}
.page-header h1 {
  font-family: var(--font-display);
  font-size: 24px;
  margin: 0 0 4px;
  color: var(--navy);
}
.page-header p { margin: 0; color: var(--grey); font-size: 14px; }

/* ---------- FLASH ---------- */
.flash {
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 18px;
  font-size: 14px;
  display: none;
}
.flash.success { background: #e5f3ea; color: var(--green); border: 1px solid #bfe3cb; }
.flash.error { background: #fbe9e4; color: var(--red); border: 1px solid #f0c4b6; }
.flash.show { display: block; }

/* ---------- CARDS / STATS ---------- */
.stat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 30px;
}
.stat-card {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 18px 20px;
}
.stat-card .label { font-size: 12.5px; color: var(--grey); text-transform: uppercase; letter-spacing: .04em; }
.stat-card .value { font-family: var(--font-display); font-size: 26px; color: var(--navy); margin-top: 6px; }
.stat-card.accent .value { color: var(--clay); }

.panel {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 22px;
  margin-bottom: 24px;
}
.panel h2 {
  font-family: var(--font-display);
  font-size: 16px;
  margin: 0 0 16px;
  color: var(--navy);
}

/* ---------- TABLE ---------- */
table { width: 100%; border-collapse: collapse; font-size: 14px; }
thead th {
  text-align: left;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: .04em;
  color: var(--grey);
  padding: 10px 12px;
  border-bottom: 2px solid var(--border);
}
tbody td { padding: 12px; border-bottom: 1px solid var(--border); vertical-align: middle; }
tbody tr:hover { background: #faf8f4; }
.badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  background: #e5f3ea;
  color: var(--green);
}
.badge.low { background: #fbe9e4; color: var(--red); }

/* ---------- FORM ---------- */
.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 14px;
  align-items: end;
}
label { display: block; font-size: 12.5px; color: var(--grey); margin-bottom: 5px; font-weight: 600; }
input, select {
  width: 100%;
  padding: 9px 11px;
  border: 1px solid var(--border);
  border-radius: 7px;
  font-size: 14px;
  background: #fff;
  font-family: var(--font-body);
}
input:focus, select:focus { outline: 2px solid var(--clay-light); border-color: var(--clay); }

.btn {
  display: inline-block;
  background: var(--clay);
  color: #fff;
  border: none;
  padding: 10px 18px;
  border-radius: 7px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  font-family: var(--font-body);
}
.btn:hover { background: #a94f22; }
.btn.secondary { background: var(--navy); }
.btn.secondary:hover { background: var(--navy-dark); }
.btn.ghost { background: transparent; color: var(--navy); border: 1px solid var(--border); }
.btn.danger { background: transparent; color: var(--red); border: 1px solid #f0c4b6; padding: 6px 12px; font-size: 12.5px; }
.btn.small { padding: 6px 12px; font-size: 12.5px; }
.actions { display: flex; gap: 6px; }

/* ---------- RESIT ---------- */
.resit-card {
  max-width: 480px;
  margin: 40px auto;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 30px;
}
.resit-card .header { text-align: center; margin-bottom: 20px; }
.resit-card .header .check {
  width: 56px; height: 56px; border-radius: 50%;
  background: #e5f3ea; color: var(--green);
  display: flex; align-items: center; justify-content: center;
  font-size: 28px; margin: 0 auto 12px;
}
.resit-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px dashed var(--border); font-size: 14px; }
.resit-row.total { font-weight: 700; font-size: 17px; border-bottom: none; color: var(--navy); padding-top: 14px; }
.resit-actions { margin-top: 24px; display: flex; gap: 10px; }

.data-note {
  font-size: 12.5px;
  color: var(--grey);
  background: #fff;
  border: 1px dashed var(--border);
  border-radius: 8px;
  padding: 10px 12px;
  margin-bottom: 20px;
}

@media (max-width: 800px) {
  .app-shell { flex-direction: column; }
  .sidebar { width: 100%; }
  .main { padding: 20px; }
}
