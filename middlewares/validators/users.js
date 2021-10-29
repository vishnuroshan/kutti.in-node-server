const { celebrate, errors, Joi } = require('celebrate');


exports.validateCreateAccount = celebrate({
	body: Joi.object().keys({
		firstname: Joi.string().required(),
		lastname: Joi.string().required(),
		email: Joi.string().email().required(),
		// password rules
		password: Joi.string().required()
		// .pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, { name: 'passwordRule' })
	})
});

exports.errors = errors;