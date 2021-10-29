const { celebrate, errors, Joi } = require('celebrate');
const validUrl = require('valid-url');

exports.validateShortenURL = celebrate({
	body: Joi.object().keys({
		url: Joi.custom((url, helpers) => {
			return validUrl.isHttpsUri(url) ? url : helpers.error('any.invalid');
		}, 'check if url is valid or not!!').message('URL not valid')
	})
});

exports.validateRemoveMultipleURL = celebrate({
	body: Joi.object().keys({
		keys: Joi.array().items(Joi.string()).required()
	})
});

exports.validateListURLs = celebrate({
	query: Joi.object().keys({
		filters: Joi.object().keys({}).optional(),
		offset: Joi.number().optional().default(0),
		limit: Joi.number().optional().default(30)
	})
});

exports.errors = errors;