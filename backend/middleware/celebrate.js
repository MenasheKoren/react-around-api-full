const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

module.exports.celebrateCreateUser = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    })
    .unknown(true),
});

module.exports.celebrateLogin = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    })
    .unknown(true),
});

module.exports.celebrateUpdateUserProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2),
  }),
});

module.exports.celebrateUpdateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateURL),
  }),
});

module.exports.celebrateCreateCard = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().custom(validateURL),
      owner: Joi.object().ref('user'),
    })
    .unknown(true),
});

module.exports.celebrateDeleteCardById = celebrate({
  params: Joi.object()
    .keys({
      cardId: Joi.string().alphanum().length(24),
    })
    .unknown(true),
});

module.exports.celebrateLikeCard = celebrate({
  params: Joi.object()
    .keys({
      cardId: Joi.string().alphanum().length(24),
    })
    .unknown(true),
});

module.exports.celebrateDislikeCard = celebrate({
  params: Joi.object()
    .keys({
      cardId: Joi.string().alphanum().length(24),
    })
    .unknown(true),
});
