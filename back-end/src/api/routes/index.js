const router = require('express').Router();

const registerRoute = require('./register.route');
const saleRouter = require('./sale.route');
const loginRouter = require('./login.route');
const customerRouter = require('./customer.route');
const sellerRoute = require('./seller.route');
const productRouter = require('./product.router');

router.use(saleRouter);
router.use(registerRoute);
router.use(loginRouter);
router.use(sellerRoute);
router.use(customerRouter);
router.use(productRouter);

module.exports = router;
