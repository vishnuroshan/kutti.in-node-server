const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt');
const { error500 } = require('../utils/errors');

exports.login = async ({ email, password }) => {
	try {
		const user = await User.getUser(email, true);
		if (user) {
			const isAuth = await bcrypt.compare(password, user.password);
			if (isAuth) {
				const { token, err } = jwt.generateJWT({ userId: user._id });
				if (err) return error500;
				return { status: 200, token };
			} else return { status: 401, message: 'invalid credentials' };
		} else return { status: 404, message: 'user not found' };
	} catch (err) {
		console.log(err);
	}
};
