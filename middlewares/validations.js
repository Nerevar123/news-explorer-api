const { celebrate, Joi } = require('celebrate');
const { ObjectId } = require('mongoose').Types;
const validator = require('validator');

const validateObjectId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().custom((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('Невалидный ID');
    }),
  }),
});

const validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'минимальная длина "name" - 2 символа',
        'string.max': 'максимальная длина "name" - 30 символов',
        'string.required': 'поле "name" должно быть заполнено',
      }),
    link: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('поле "link" должно быть валидным url-адресом');
    })
      .messages({
        'string.required': 'поле "link" должно быть заполнено',
      }),
  }),
});

const validateArticleBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'минимальная длина "name" - 2 символа',
        'string.max': 'максимальная длина "name" - 30 символов',
        'string.required': 'поле "name" должно быть заполнено',
      }),
    email: Joi.string().required().email()
      .message('поле "email" должно быть валидным email-адресом')
      .messages({
        'string.required': 'поле "email" должно быть заполнено',
      }),
  }),
});

module.exports = { validateObjectId, validateUserBody, validateArticleBody };
