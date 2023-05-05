const loginService = require('../services/login.service');

const findUser = async (req, res) => {
  const verifiedToken = await loginService.findUser(req.body);
  return res.status(200).json(verifiedToken);
};

module.exports = { findUser };