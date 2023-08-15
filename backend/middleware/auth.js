const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');
const { JWT_SECRET, NODE_ENV } = require('../utils/constants');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    next(new AuthError('Пожалуйста, авторизуйтесь'));
    return;
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
  } catch (err) {
    next(new AuthError('Пожалуйста, авторизуйтесь'));
    return;
  }
  req.user = payload;
  next();
};

module.exports = auth;
