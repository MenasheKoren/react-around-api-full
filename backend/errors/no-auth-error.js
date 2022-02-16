const { ERROR_CODE_401 } = require('./error-constants');

module.exports.noAuthErrorHandler = (res) => {
  res.status(ERROR_CODE_401).send({ message: 'Authorization Required' });
};
