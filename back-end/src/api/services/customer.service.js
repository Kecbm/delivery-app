const { Sale, SaleProduct } = require('../../database/models');

const getById = async (id) => {
  const sale = await Sale.findByPk(id, {
    include: [{ model: SaleProduct, as: 'products' }],
  });

  if (!sale) {
    const error = {
      status: 404,
      message: 'Sale not found',
    };
    throw error;
  }
  
  return sale;
};

module.exports = { getById };
