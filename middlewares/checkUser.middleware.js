const User = require('../models/user.model')

module.exports.checkUser = async (req, res, next) => {
  let user = await User.findOne({ _id: req.signedCookies.userId });

  if (!user) {
    next();
    return;
  }

  res.locals.user = user;

  next();
} 