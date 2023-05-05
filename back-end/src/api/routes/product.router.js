const { Router } = require('express');

const ProductController = require('../controllers/product.controller');

const router = Router();

router.get('/products', ProductController.findAll);

module.exports = router;