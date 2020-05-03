require('dotenv').config()
const express = require('express')
const app = express()
const favicon = require('serve-favicon')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port = process.env.PORT || 3000;

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL,{ 
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userRoute = require('./routes/user.route');
const productRoute = require('./routes/product.route');
const shopRoute = require('./routes/shop.route');
const authRoute = require('./routes/auth.route');
const cartRoute = require('./routes/cart.route');
const transactionRoute = require('./routes/transaction.route');

const authMiddleware = require('./middlewares/auth.middleware');
const checkUserMiddleware = require('./middlewares/checkUser.middleware');
const sessionMiddleware = require('./middlewares/session.middleware');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(express.static('public'));

app.set('views', './views')
app.set('view engine', 'pug')

//Identify user
app.use(checkUserMiddleware.checkUser);
//Check sessionId of user
app.use(sessionMiddleware);

app.get('/', (req, res) => res.render('index'));

app.use('/login', authRoute)
app.use('/products', productRoute)
app.use('/cart', cartRoute)

app.use(authMiddleware.requireAuth);
app.use('/transactions', transactionRoute)
app.use('/shops', shopRoute)
app.use('/users', userRoute)

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))