const Transaction = require('../models/transaction.model');
const User = require('../models/user.model');

module.exports.index = async (req, res) => {
  if (!req.signedCookies.userId) {
    res.redirect('/login');
    return;
  }

  let user = await User.findOne({ _id: req.signedCookies.userId });

  if (!user) {
    res.redirect('/login');
    return;
  }

  let transactions = await Transaction.find();

  res.render('transactions/index', {
    transactions: transactions
  })
}