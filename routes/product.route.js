const express = require('express')
const router = express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const productController = require('../controllers/product.controller');

router.get('/', productController.index);

router.get('/:id/create', productController.create);

router.post('/:id/create', upload.single('coverImage'), productController.postCreate);

router.get('/:id/add',  productController.addToCart);

module.exports = router