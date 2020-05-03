const mongoose = require('mongoose'); 

const sessionSchema = mongoose.Schema({
  id: String,
  cart: []
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;