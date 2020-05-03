const express = require('express')
const router = express.Router();

const shopController = require('../controllers/shop.controller');

router.get('/', shopController.index)

router.get('/:id/create', shopController.create)

router.post('/:id/create', shopController.postCreate)

module.exports = router;