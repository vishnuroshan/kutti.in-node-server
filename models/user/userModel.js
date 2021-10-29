const mongoose = require('../../db/connection');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
	firstname: {
		type: String,
		set: (val) => val.trim()
	},
	lastname: {
		type: String,
		set: (val) => val.trim()
	},
	email: {
		type: String,
		unique: true,
		set: (email) => email.toLowerCase().trim()
	},
	password: {
		type: String,
		select: false,
		set: (pass) => bcrypt.hashSync(pass, 10),
	},
	status: {
		type: String,
		enum: ['active', 'inactive'],
		default: 'active',
	},
}, { toJSON: { getters: true } });

const User = mongoose.model('user', UserSchema);

User.prototype.asJson = function () {
	console.log(this);
};

module.exports = User;
