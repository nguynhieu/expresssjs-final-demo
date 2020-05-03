const express = require('express')
const router = express.Router();

const cartController = require('../controllers/cart.controller');

router.get('/', cartController.index);

router.get('/:id/buy', cartController.buy);

router.get('/:id/buyAll', cartController.buyAll);

module.exports = router