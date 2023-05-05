const md5 = require('md5');
const { User } = require('../../database/models');
const jwt = require('../../utils/jwt');

const newUserShortHand = (newToken) => {
  const userInfo = jwt.verifyToken(newToken);
  return {
    name: userInfo.name,
    email: userInfo.email,
    role: userInfo.role,
    token: newToken,
  };
};

const createNewUserShortHand = (newUser) => (jwt.generateToken({
  id: newUser.id,
  name: newUser.name,
  email: newUser.email,
  role: newUser.role,
}));

const createUser = async ({ name, email, password }) => {
  const user = await User.findOne({
    where: { email },
  });

  if (user) {
    const error = { status: 409, message: 'Usuário já cadastrado.' };
    throw error;
  }

  const newUser = await User.create({
    name,
    email,
    password: md5(password),
  });

  const newToken = createNewUserShortHand(newUser);
  return newUserShortHand(newToken);
};

module.exports = { createUser };
