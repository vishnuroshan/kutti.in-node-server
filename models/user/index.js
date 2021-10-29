const User = require('./userModel');
exports.createUser = async (newUser) => User.create(newUser);
exports.getUser = async (email, privateFields = false) => {
	const filter = { email, status: 'active' };

	const user = User.findOne(filter);

	if (privateFields) return user.select('+password').lean();

	return user.lean();
};
exports.getUserById = (_id) => User.findById(_id).lean();