const ProductService = require('../services/product.service');

const findAll = async (_req, res) => {
  const products = await ProductService.findAll();

  return res.status(200).json(products);
};

module.exports = { findAll };