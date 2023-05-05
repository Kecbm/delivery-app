const jwt = require('jsonwebtoken');
const fs = require('fs');

const secret = fs.readFileSync('jwt.evaluation.key', 'utf-8');

const jwtConfig = {
  expiresIn: '15d',
  algorithm: 'HS256',
};

const generateToken = (data) => jwt.sign(data, secret, jwtConfig);

const verifyToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (e) {
    const error = {
      status: 401,
      message: 'Expired or invalid token',
    };
    throw error;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
