const jwt = require('../utils/jwt');
const User = require('../models/user');

exports.createUser = async (newUser) => {
	try {
		const user = await (await User.createUser(newUser)).toJSON();
		const { token } = jwt.generateJWT({ userId: user._id });
		return { token };
	} catch (err) {
		console.log(err);
	}
};