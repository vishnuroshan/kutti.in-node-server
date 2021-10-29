const jsonwebtoken = {};
const jwt = require('jsonwebtoken');
const config = require('../config/app-config');

const jwtHead = {
	algorithm: 'HS256',
	expiresIn: '7d'
};

jsonwebtoken.generateJWT = (payload) => {
	try {
		let token = jwt.sign(payload, config.KEY, jwtHead);
		return { token, err: null };
	} catch (err) {
		return { token: null, err };
	}
};


jsonwebtoken.validateJWT = (token) => {
	try {
		const payload = jwt.verify(token, config.KEY);
		return { payload, err: null };
	} catch (err) {
		return { err, payload: null };
	}
};

module.exports = jsonwebtoken;
