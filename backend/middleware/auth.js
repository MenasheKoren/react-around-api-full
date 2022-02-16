require('dotenv').config();
const jwt = require('jsonwebtoken');
const { noAuthErrorHandler } = require('../errors/no-auth-error');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return noAuthErrorHandler(res);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  const { NODE_ENV, JWT_SECRET } = process.env;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch (err) {
    return noAuthErrorHandler(res);
  }

  req.user = payload;

  return next();
};
