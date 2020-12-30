const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/not-authorized-error');
const { JWT_SECRET } = require('../config');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) throw new UnauthorizedError('Необходима авторизация');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(err);
  }

  req.user = payload;

  next();
};
