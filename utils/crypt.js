const bcrypt = require('bcryptjs');
const ValidationError = require('../errors/validation-error');

function cryptHash(password) {
  if (!password) {
    return Promise.reject(new ValidationError('Необходимо ввести пароль'));
  }

  return bcrypt.hash(password, 10);
}

const cryptCompare = (password, hashedPassword) => {
  if (!password || !hashedPassword) {
    return Promise.reject(new ValidationError('Необходимо ввести пароль'));
  }

  return bcrypt.compare(password, hashedPassword);
};

module.exports = { cryptCompare, cryptHash };
