const jwt = require('../utils/jwt');
const User = require('../models/user');
const { error500, error401 } = require('../utils/errors');

exports.checkToken = async (request, response, next) => {
	try {
		let token = request.headers.authorization;
		if (token) {
			if (token.startsWith('Bearer ')) token = token.slice(7, token.length);

			const { payload, err } = jwt.validateJWT(token);
			
			if (err) {
				console.log(err);
				return response.status(error500.status).json(error500);
			}
			if (payload) {
				const user = await User.getUserById(payload.userId);
				request.user = user;
				next();
			}

		} else {
			//? shorten endpoint can work with or without token with varied behaviours 
			if (request.url === '/shorten') return next();
			//? else token not sent 
			else return response.status(error401.status).json(error401);
		}
	} catch (err) {
		console.log(err);
		return response.status(error500.status).json(error500);
	}
};
