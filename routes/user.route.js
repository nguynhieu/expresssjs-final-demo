const express = require('express')
const router = express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const userController = require('../controllers/user.controller');

router.get('/', userController.index);

router.get('/signup', userController.signup);

router.post('/signup', upload.single('avatar'), userController.postSignup);

router.get('/:id/profile', userController.profile);

router.post('/:id/profile', upload.single('newAvatar'), userController.updateAvatar);

module.exports = router;