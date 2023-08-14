const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');
const { JWT_SECRET, NODE_ENV } = require('../utils/constants');

function authorize(req) {
    const { authorization } = req.headers;
    if (!authorization) throw new AuthError('Пожалуйста, авторизуйтесь');
  
    const token = authorization.replace('Bearer ', '');
    return jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
}

const auth = (req, res, next) => {
    try {
        req.user = authorize(req);
        next();
    } catch (err) {
        next(err instanceof jwt.JsonWebTokenError ? new AuthError('Пожалуйста, авторизуйтесь') : err);
    }
};

module.exports = auth;