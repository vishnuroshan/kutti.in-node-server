const mongoose = require('../../db/connection');
const Schema = mongoose.Schema;

const UrlSchema = new Schema({
	url: {
		type: String,
		set: (val) => val.trim()
	},
	uniqueKey: {
		type: String,
		unique: true,
		required: true
	},
	clicks: {
		type: Number,
		default: 0
	},
	analytics: {
		type: Array,
		default: []
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	status: {
		type: String,
		enum: ['active', 'inactive', 'removed'],
		default: 'active'
	},
	expiresIn: {
		default: 0,
		type: Number
	}
}, { timestamps: true });

const Url = mongoose.model('url', UrlSchema);

module.exports = Url;
