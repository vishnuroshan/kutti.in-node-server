const router = require('express').Router();

const { createUser } = require('../controllers/users');
const { error500 } = require('../utils/errors');
const { validateCreateAccount, errors } = require('../middlewares/validators/users');

router.post('/create-account', validateCreateAccount, errors(), async (request, response) => {
	try {
		console.log(request.body);
		const result = await createUser(request.body);
		response.status(200).json(result);

	} catch (err) {
		console.log(err);
		response.status(error500.status).json(error500);
	}
});

module.exports = router;