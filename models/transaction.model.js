const mongoose = require('mongoose'); 

const transactionSchema = mongoose.Schema({
  product: [],
  shop: String,
  userEmail: String,
  date: Date
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;