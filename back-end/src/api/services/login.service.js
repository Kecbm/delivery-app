const md5 = require('md5');
const { generateToken } = require('../../utils/jwt');

const { User } = require('../../database/models');

const findUser = async ({ email, password }) => {
  const hash = md5(password);
  const userExists = await User.findOne({ where: { email, password: hash } });
  if (!userExists) {
    const error = {
      status: 404,
      message: 'Not found',
    };
    throw error;
  }
  const { name, role, id } = userExists;
  const token = generateToken({ id, name, email, role });
  return { name, email, role, token };
};

module.exports = {
  findUser,
};
