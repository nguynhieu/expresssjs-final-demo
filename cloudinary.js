const cloudinary = require('cloudinary')

cloudinary.config({ 
  cloud_name: 'reii', 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});

module.exports = cloudinary;