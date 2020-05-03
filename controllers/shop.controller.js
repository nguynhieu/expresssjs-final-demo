const Shop = require('../models/shop.model')
const User = require('../models/user.model')

module.exports.index = async (req, res) => {
  let user = await User.findOne({ _id: req.signedCookies.userId });

  let shop = await Shop.findOne({ ownerId: user._id });

  res.render('shops/index', {
    shop: shop
  });
};

module.exports.create = (req, res) => {
  res.render('shops/create');
}

module.exports.postCreate = async (req, res) => {
  let myShop = {
    shop: req.body.shop,
    ownerId: req.params.id,
    product: [],
    address: req.body.address,
    phone: req.body.phone
  }

  await Shop.insertMany(myShop);

  res.redirect('/shops');
}