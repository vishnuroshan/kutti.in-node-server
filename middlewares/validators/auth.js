
const { celebrate, errors, Joi } = require('celebrate');

exports.validateLogin = celebrate({
	body: Joi.object().keys({
		email: Joi.string().email().required(),
		password: Joi.string().required()
	})
});

exports.errors = errors;