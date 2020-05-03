const shortid = require('shortid');

const Session = require('../models/session.model');

module.exports = async (req, res, next) => {
  if (!req.signedCookies.sessionId) {
    let sessionId = shortid.generate();

    res.cookie('sessionId', sessionId, {
      signed: true
    });

    await Session.insertMany({
      id: sessionId,
      cart: []
    })

    res.redirect('/');
    return;
  }

  let session = await Session.findOne({ id: req.signedCookies.sessionId })
  let productsInCart = session.cart;

  res.locals.totalsProductsInCart = productsInCart.length;

  next();
}