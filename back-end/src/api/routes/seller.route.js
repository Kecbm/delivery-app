const routes = require('express').Router();
const controller = require('../controllers/seller.controller');
const jwtMiddleware = require('../middlewares/jwt.middleware');

routes.get('/seller/orders', jwtMiddleware, controller.findSalesBySeller);
routes.get('/seller/orders/:id', jwtMiddleware, controller.getById);
routes.get('/sellers', controller.getSellers);
routes.patch('/seller/orders/:id', jwtMiddleware, controller.updateSaleStatus);

module.exports = routes;
