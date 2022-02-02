require('dotenv').config()
const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  console.log(req.headers);

  if (!authorization || !authorization.startsWith('Bearer ')) {
    console.log(authorization);
    return res.status(401).send({ message: 'Authorization Required' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  const { NODE_ENV, JWT_SECRET } = process.env;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return res.status(401).send({ message: 'Authorization Required' });
  }

  req.user = payload;

  next();
};
