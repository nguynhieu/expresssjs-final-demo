const bcrypt = require('bcrypt');
const saltRounds = 10;

const cloudinary = require('../cloudinary');

const User = require('../models/user.model');

module.exports.index = async (req, res) => {
    // get total page in index user page
    let users = await User.find();
    let totalPage = Math.ceil(users.length/5);

    let page = req.query.page || 1;
    
    // get user per page
    let usersPerpage = await User.find()
        .skip((page - 1)* 5)
        .limit(5);

    res.render('users/index', {
        page: parseInt(page),
        totalPage: totalPage,
        users: usersPerpage
    });
}

module.exports.signup = async (req, res) => {
    res.render('users/signup');
}

module.exports.postSignup = async (req, res, next) => {
    let path;
    let avatar;
    let password = await bcrypt.hash(req.body.password, saltRounds);
    
    if (req.file) {
        path = req.file.path;
    }

    if (path) {
        await cloudinary.v2.uploader.upload(path, (error, result) => {
            avatar = result.url;
        });
    }

    let newUser = {
        name: req.body.name,
        email: req.body.email,
        password: password,
        isAdmin: false,
        age: req.body.age,
        address: req.body.address,
        phone: req.body.phone,
        shop: false,
        avatar: avatar
    }

    await User.insertMany(newUser);
    
    res.redirect('/users');
}

module.exports.profile = async (req, res) => {
    let user = await User.findOne({ _id: req.params.id })
    
    res.render('users/profile', {
        user: user
    });
}

module.exports.updateAvatar = async (req, res) => {
    let path;
    let newAvatar;

    if (req.file) {
        path = req.file.path;
    }
    
    if (path) {
        await cloudinary.v2.uploader.upload(path, (error, result) => {
            newAvatar = result.url;
        });
    }
    await User.findOneAndUpdate(
        { _id: req.params.id },
        { avatar: newAvatar }
    )

    res.redirect(`/users/${req.params.id}/profile`);
}