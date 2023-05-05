const service = require('../services/customer.service');

const getById = async (req, res) => {
  const { id } = req.params;

  const sale = await service.getById(id);

  res.status(200).json(sale);
};

module.exports = {
  getById,
};