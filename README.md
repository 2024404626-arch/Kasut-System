<!DOCTYPE html>
<html lang="ms">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Resit Pembayaran · Sistem Pembelian Kasut</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>
  <div class="app-shell">
    <aside class="sidebar" id="sidebar"></aside>
    <main class="main">
      <div class="resit-card" id="resitCard">
        <p style="text-align:center;color:var(--grey);">Memuatkan resit...</p>
      </div>
    </main>
  </div>

  <script src="js/data.js"></script>
  <script>
    const session = kkRequireLogin();
    if (session) {
      kkRenderSidebar('pembelian');

      const params = new URLSearchParams(window.location.search);
      const id = parseInt(params.get('id'));

      const pembelian = kkGet(DB_KEYS.pembelian);
      const resit = pembelian.find(p => p.id === id);
      const card = document.getElementById('resitCard');

      if (!resit) {
        card.innerHTML = `
          <p style="text-align:center;color:var(--grey);">Resit tidak dijumpai.</p>
          <div class="resit-actions">
            <a href="pembelian.html" class="btn secondary" style="flex:1;text-align:center;">Kembali</a>
          </div>
        `;
      } else {
        const customer = kkGet(DB_KEYS.customer).find(c => c.id === resit.customer_id) || {};
        const kasut = kkGet(DB_KEYS.kasut).find(k => k.id === resit.kasut_id) || {};
        const staff = kkGet(DB_KEYS.staff).find(s => s.id === resit.staff_id) || {};

        card.innerHTML = `
          <div class="header">
            <div class="check">✓</div>
            <h1 style="font-family:var(--font-display);color:var(--navy);margin:0;">Pembayaran Berjaya</h1>
            <p style="color:var(--grey);margin:4px 0 0;">Resit #${String(resit.id).padStart(5, '0')}</p>
          </div>

          <div class="resit-row"><span>Customer</span><strong>${kkEscape(customer.nama)}</strong></div>
          <div class="resit-row"><span>No. Telefon</span><span>${kkEscape(customer.no_telefon) || '-'}</span></div>
          <div class="resit-row"><span>Kasut</span><span>${kkEscape(kasut.brand)} ${kkEscape(kasut.model)} (Saiz ${kkEscape(kasut.saiz)})</span></div>
          <div class="resit-row"><span>Kuantiti</span><span>${resit.kuantiti}</span></div>
          <div class="resit-row"><span>Harga Seunit</span><span>${kkFormatRM(resit.harga_seunit)}</span></div>
          <div class="resit-row"><span>Kaedah Bayaran</span><span>${kkEscape(resit.kaedah_bayaran)}</span></div>
          <div class="resit-row"><span>Diproses Oleh</span><span>${kkEscape(staff.nama)}</span></div>
          <div class="resit-row"><span>Tarikh</span><span>${kkFormatTarikh(resit.tarikh)}</span></div>
          <div class="resit-row total"><span>Jumlah Bayaran</span><span>${kkFormatRM(resit.jumlah)}</span></div>

          <div class="resit-actions">
            <a href="pembelian.html" class="btn secondary" style="flex:1;text-align:center;">Kembali</a>
            <button onclick="window.print()" class="btn" style="flex:1;">🖨️ Cetak</button>
          </div>
        `;
      }
    }
  </script>
</body>
</html>
