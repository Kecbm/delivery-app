require('dotenv').config();

const Sequelize = require('sequelize');
const sequelizeConfig = require('../../database/config/config');
const { Sale, SaleProduct, Product, User } = require('../../database/models');

const sequelize = new Sequelize(sequelizeConfig[process.env.NODE_ENV]);

const create = async (data) => {
  try {
    return sequelize.transaction(async (t) => {
      const sale = await Sale.create(data, { transaction: t });

      await Promise.all(
        data.products.map((product) => (
          SaleProduct.create({
            productId: product.id,
            saleId: sale.id,
            quantity: product.quantity,
          }, { transaction: t }))),
      );

      return sale;
    });
  } catch (e) {
    const error = { status: 500, message: e.message };
    throw error;
  }
};

const getById = async (id) => {
  const sale = await Sale.findByPk(id, {
    include: [
      { model: Product, as: 'products', through: { attributes: ['quantity'], as: 'saleProduct' } },
      { model: User, attributes: ['name'], as: 'seller' },
    ],
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

const getAll = async (userId) => Sale.findAll({
  where: { userId },
  include: [
    { model: Product, as: 'products', through: { attributes: ['quantity'], as: 'saleProduct' } },
  ],
});

const updateStatus = async (id, status) => {
  const sale = await Sale.findByPk(id);

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

module.exports = { create, getById, getAll, updateStatus };
