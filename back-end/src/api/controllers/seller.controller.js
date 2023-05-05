const service = require('../services/seller.service');

const findSalesBySeller = async (_req, res) => {
  const allSales = await service.findSalesBySeller();
  return res.status(200).json(allSales);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const sale = await service.getById(id);

  res.status(200).json(sale);
};

const getSellers = async (_req, res) => {
  const sellers = await service.getSellers();
  return res.status(200).json(sellers);
};

const updateSaleStatus = async (req, res) => {
  const { userData } = req;
  const { saleId, status } = req.body;

  if (userData.role === 'customer') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const saleUpdated = await service.updateStatus(saleId, status);

  return res.status(200).json(saleUpdated);
};

module.exports = {
  findSalesBySeller,
  getById,
  updateSaleStatus,
  getSellers,
};
