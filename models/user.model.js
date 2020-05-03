const mongoose = require('mongoose'); 

const userSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    email: String,
    password: String,
    isAdmin: Boolean,
    age: Number,
    address: String,
    shop: Boolean,
    phone: Number,
    avatar: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;