const { findOne } = require('./urlModel');
const Url = require('./urlModel');
exports.createUrl = (newURL) => Url.create(newURL);
exports.addAnalytics = (uniqueKey, analytic) => Url.updateOne({ uniqueKey, status: 'active' }, { $push: { analytics: analytic } });
exports.getUrlsForUser = (userId, offset, limit) => Url.find({ userId }).skip(offset).limit(limit).sort({ createdAt: -1 }).lean();
exports.getUrl = (uniqueKey, updateClickCount = false) =>
	updateClickCount ? Url.findOneAndUpdate({ uniqueKey }, { $inc: { 'clicks': 1 } }, { new: true }).lean() : findOne({ uniqueKey }).lean();
exports.getUrlCount = async (filter = {}) => Url.countDocuments(filter).exec();
exports.deleteUrl = async (uniqueKeys) => Url.updateMany({ uniqueKey: { $in: uniqueKeys }, status: 'active' }, { $set: { status: 'removed' } });