const Session = require('../models/session.model');
const User = require('../models/user.model');
const Transaction = require('../models/transaction.model');
const Product = require('../models/product.model');

const mongoose = require('mongoose');

module.exports.index = async (req, res) => {
  if (!req.signedCookies.sessionId) {
    res.redirect('/products');
    return;
  }
  
  let session = await Session.findOne({ id: req.signedCookies.sessionId });
  let productsInCart = session.cart;

  res.render('cart/index', {
    session: session,
    productsInCart: productsInCart
  })
}

module.exports.buy = async (req, res) => {
  if (!req.signedCookies.userId) {
    res.redirect('/login');
    return;
  }

  let user = await User.findOne({ _id: req.signedCookies.userId });

  if (!user) {
    res.redirect('/login');
    return;
  }

  let product = await Product.findOne({ _id: req.params.id });

  let transaction = {
    product: [product],
    shop: product.shopName,
    userEmail: user.email,
    date: new Date()
  };

  let session = await Session.findOne({ id: req.signedCookies.sessionId });

  await Transaction.insertMany(transaction);
  await Session.findOneAndUpdate(
    { id: req.signedCookies.sessionId },
    { $pull: {
        cart: {
          _id: mongoose.Types.ObjectId(req.params.id)
        }
      }
    }
  )

  res.redirect('/transactions');
};

module.exports.buyAll = async (req, res) => {
  if (!req.signedCookies.userId) {
    res.redirect('/login');
    return;
  }

  let user = await User.findOne({ _id: req.signedCookies.userId });

  if (!user) {
    res.redirect('/login');
    return;
  }

  let session = await Session.findOne({ id: req.signedCookies.sessionId });
  let productsInCart = session.cart;

  let transaction = {
    product: productsInCart,
    shop: productsInCart.shopName,
    userEmail: user.email,
    date: new Date()
  };

  await Transaction.insertMany(transaction);
  await Session.findOneAndUpdate(
    { id: req.signedCookies.sessionId },
    { $set: {
        cart: []
      }
    }
  );
  
  res.redirect('/transactions');
};