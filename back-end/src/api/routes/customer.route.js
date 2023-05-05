const customerRouter = require('express').Router();
const controller = require('../controllers/customer.controller');

customerRouter.get('/customer/orders/:id', controller.getById);

module.exports = customerRouter;