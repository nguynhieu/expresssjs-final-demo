const express = require('express')
const router = express.Router();

const authController = require('../controllers/auth.controller');

router.get('/', authController.index);

router.post('/', authController.postLogin);

router.get('/logout', authController.logout);

module.exports = router