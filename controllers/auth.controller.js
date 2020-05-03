const User = require('../models/user.model')
const bcrypt = require('bcrypt');

module.exports.index = (req, res) => {
  res.render('login');
}

module.exports.postLogin = async (req, res) => {
  let userAcc = await User.findOne({ email: req.body.email });

  // Check account user
  if (!userAcc) {
    res.render('login', {
      err: 'Not found user'
    })
    return;
  }
  let checkUser = await bcrypt.compare(req.body.password, userAcc.password)
  // Find user with password
  if (!checkUser) {
    res.render('login', {
      email: req.body.email,
      err: 'Wrong password'
    })
    return;
  }

  res.cookie('userId', userAcc._id, {
    signed: true
  });

  res.redirect('/products');
}

module.exports.logout = (req, res) => {
  res.clearCookie('userId');

  res.redirect('/');
}