const jwt = require('../../utils/jwt');

module.exports = (req, res, next) => {
const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  req.userData = jwt.verifyToken(authorization);

  return next();
}; 
