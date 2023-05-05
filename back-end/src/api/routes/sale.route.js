const saleRouter = require('express').Router();
const controller = require('../controllers/sale.controller');
const jwtMiddleware = require('../middlewares/jwt.middleware');

saleRouter.post('/sales/:id/', jwtMiddleware, controller.updateSaleStatus);
saleRouter.post('/sales', jwtMiddleware, controller.createSale);
saleRouter.get('/sales/:id', jwtMiddleware, controller.getSaleById);
saleRouter.get('/sales', jwtMiddleware, controller.getSales);

module.exports = saleRouter;
