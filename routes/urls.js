const router = require('express').Router();
const { getUrlAndUpdateClickCount, getUrlsForUser, addAnalytics, createUrl, deleteUrls } = require('../controllers/urls');
const { BASE_URL } = require('../config/app-config');
const shortid = require('shortid');
const { checkToken } = require('../middlewares/auth');
const { validateShortenURL, validateRemoveMultipleURL, validateListURLs, errors } = require('../middlewares/validators/urls');
const { error500, error422 } = require('../utils/errors');


router.get('/', (request, response) => {
	response.status(200).send('<h1>Hi</h1> welcome to <h3>linkBro<h3><br>A simple URL shortener service');
});

// redirect
router.get('/:id', async (request, response) => {
	try {
		const id = request.params.id;
		const ipInfo = request.ipInfo;
		const urlObject = await getUrlAndUpdateClickCount(id);

		if (urlObject && urlObject.url) {
			//TODO discuss on adding templates
			if (urlObject.status === 'inactive') {
				response.status(404).send('<h1>The URL is not active anymore.</h1>');
				return;
			}
			if (urlObject.status === 'removed') {
				response.status(404).send('404 not found');
				return;
			}
			response.status(301).redirect(urlObject.url);
			//? analtyics are added for all URLs
			await addAnalytics(id, { ipInfo, when: new Date().toISOString() });
		} else response.status(404).send('404 not found');

	} catch (err) {
		console.log(err);
		response.status(error500.status).json(error500);
	}

});

router.post('/shorten', checkToken, validateShortenURL, errors(), async (request, response) => {
	try {
		const data = request.body;
		if (request.user && request.user._id) data.userId = request.user._id;

		const urlObj = await createUrl({
			...data,
			uniqueKey: shortid.generate()
		});
		let shortUrl = `${BASE_URL}/${urlObj.uniqueKey}`;
		response.status(200).json({ shortUrl, isAuth: request.user ? true : false });
	} catch (err) {
		console.log(err);
		response.status(error500.status).json(error500);
	}
});

router.get('/urls/list', checkToken, validateListURLs, errors(), async (request, response) => {
	try {
		const offset = request.query.offset;
		const limit = request.query.limit;

		const result = await getUrlsForUser(request.user._id, offset, limit);

		response.status(200).json({ ...result, status: 200 });
	} catch (err) {
		console.log(err);
		response.status(error500.status).json(error500);
	}
});

router.delete('/remove/:id', checkToken, async (request, response) => {
	try {
		const key = request.params.id;
		await deleteUrls([key]);
		response.status(200).json({ status: 200, message: 'deleted' });
	} catch (err) {
		console.log(err);
		response.status(error500.status).json(error500);
	}
});

router.post('/remove', checkToken, validateRemoveMultipleURL, errors(), async (request, response) => {
	try {
		const keys = request.body.keys;
		if (keys.length > 1) await deleteUrls(keys);
		else response.status(error422.status).json(error422);

		response.status(200).json({ status: 200, message: 'URLs deleted' });
	} catch (err) {
		console.log(err);
		response.status(error500.status).json(error500);
	}
});

module.exports = router;