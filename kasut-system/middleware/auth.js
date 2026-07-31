function pastikanLogin(req, res, next) {
  if (req.session && req.session.staff) {
    return next();
  }
  req.flash('error', 'Sila log masuk dahulu untuk mengakses halaman ini.');
  res.redirect('/login');
}

function pastikanBelumLogin(req, res, next) {
  if (req.session && req.session.staff) {
    return res.redirect('/dashboard');
  }
  next();
}

module.exports = { pastikanLogin, pastikanBelumLogin };
