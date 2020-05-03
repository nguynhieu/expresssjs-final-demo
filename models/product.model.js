const mongoose = require('mongoose'); 

const userSchema = mongoose.Schema({
    title: String,
    quantity: Number,
    shopId: String,
    shopName: String,
    description: String,
    coverImage: String
});

const Product = mongoose.model('Product', userSchema);

module.exports = Product;