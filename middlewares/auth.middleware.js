const User = require('../models/user.model')

module.exports.requireAuth = async (req, res, next) => {
  if (req.originalUrl === '/users/signup') {
    next();
    return;
  }

  if (!req.signedCookies.userId) {
    res.redirect('/login')
    return;
  };

  let user = await User.findOne({ _id: req.signedCookies.userId });

  if (!user) {
    res.redirect('/login');
    return;
  }

  next();
} 