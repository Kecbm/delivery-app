const service = require('../services/sale.service');

const createSale = async (req, res) => {
  const { id } = await service.create({ ...req.body, userId: req.userData.id });

  res.status(201).json({ id });
};

const getSaleById = async (req, res) => {
  const { id } = req.params;

  const sale = await service.getById(id);

  res.status(200).json(sale);
};

const getSales = async (req, res) => {
  const sales = await service.getAll(req.userData.id);

  res.status(200).json(sales);
};

const updateSaleStatus = async (req, res) => {
  const { userData } = req;
  const { status } = req.query;

  const saleUpdated = await service.updateStatus(userData.id, status);

  res.status(200).json(saleUpdated);
};

module.exports = {
  createSale,
  getSaleById,
  getSales,
  updateSaleStatus,
};
