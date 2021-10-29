
const { getUrlCount, getUrl, getUrlsForUser, addAnalytics, deleteUrl, createUrl } = require('../models/urls');

exports.getUrlAndUpdateClickCount = async (key) => {
	try {
		let shortURL = await getUrl(key, true);
		return shortURL;
	} catch (err) {
		console.log(err);
	}
};

exports.deleteUrls = async (keys) => {
	try {
		return await deleteUrl(keys);
	} catch (err) {
		console.log(err);
	}
};

exports.addAnalytics = async (key, analytics) => {
	try {
		let res = await addAnalytics(key, analytics);
		return res;
	} catch (err) {
		console.log(err);
	}
};

exports.createUrl = async (newUrl) => {
	try {
		let shortURL = await createUrl(newUrl);
		return shortURL;
	} catch (err) {
		console.log(err);
	}
};

exports.getUrlsForUser = async (userId, offset = 0, limit = 30) => {
	try {
		let count = await getUrlCount({ userId });

		let urls = await getUrlsForUser(userId, offset, limit);
		return {
			urls,
			metadata: {
				total: count,
				totalPages: Math.ceil(count / limit),
				resultPerPage: limit,
				skip: offset,
			}
		};
	} catch (err) {
		console.log(err);
	}
};