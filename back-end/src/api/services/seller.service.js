const { Sale, SaleProduct, User } = require('../../database/models');

const findSalesBySeller = async () => {
  const allSales = await Sale.findAll();

  return allSales;
};

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

const getSellers = async () => (
  User.findAll(
    { where: { role: 'seller' }, attributes: ['id', 'name'] },
  ));

const updateStatus = async (saleId, status) => {
  const sale = await Sale.findByPk(saleId);

  if (!sale) {
    const error = {
      status: 404,
      message: 'Sale not found',
    };
    throw error;
  }

  sale.status = status;
  await sale.save();

  return sale;
};

module.exports = { getById, findSalesBySeller, updateStatus, getSellers };
