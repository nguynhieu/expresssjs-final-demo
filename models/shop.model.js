const mongoose = require('mongoose'); 

const shopSchema = mongoose.Schema({
  shop: String,
  ownerId: String,
  product: [],
  address: String,
  phone: String,
});

const Shop = mongoose.model('Shop', shopSchema);

module.exports = Shop;