const Product = require('../models/product.model')
const Shop = require('../models/shop.model')
const Session = require('../models/session.model')

const cloudinary = require('../cloudinary');

module.exports.index = async (req, res) => {
  let products = await Product.find()

  let totalPage = Math.ceil(products.length/6);

  let page = req.query.page || 1;
    
  // get user per page
  let productPerpage = await Product.find()
    .skip((page - 1)* 6)
    .limit(6);

  res.render('products/index', {
    page: parseInt(page),
    totalPage: totalPage,
    products: productPerpage
  });
}

module.exports.create = (req, res) => {
  let id = req.params.id;

  res.render('products/create', {
    id: id
  });
}

module.exports.postCreate = async (req, res) => {
  let shop = await Shop.find({ _id: req.params.id })

  let path;
  let coverImage;

  if (req.file) {
    path = req.file.path;
  }
  
  if (path) {
      await cloudinary.v2.uploader.upload(path, (error, result) => {
          coverImage = result.url;
      });
  }

  let product = {
    title: req.body.title,
    quantity: 1,
    shopId: shop._id,
    shopName: shop.shop,
    description: req.body.description,
    coverImage
  };

  await Product.insertMany(product);

  await Shop.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $push: {
        product: product
      }
    }
  )

  res.redirect('/shops');
}


module.exports.addToCart =  async (req, res) => {
  if (!req.signedCookies.sessionId) {
    res.redirect('/products');
    return;
  }

  let product = await Product.findOne({ _id: req.params.id });

  await Session.findOneAndUpdate(
    { id: req.signedCookies.sessionId },
    { $push: {
        cart: product
      }
    }
  )

  res.redirect('/products')
};