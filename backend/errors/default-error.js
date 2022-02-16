const { ERROR_CODE_500, ERROR_CODE_404 } = require('./error-constants');

module.exports.defaultErrorHandler = (err, req, res, next) => {
  if (err.name === 'PageNotFound') {
    res.status(ERROR_CODE_404).send({
      message: `${err.message}`,
    });
  } else {
    res.status(ERROR_CODE_500).send({
      message: 'An error has occurred on the server',
    });
  }
  return next && next();
};
