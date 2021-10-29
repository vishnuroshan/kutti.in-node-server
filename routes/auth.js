const router = require('express').Router();
const {login} = require('../controllers/auth');
const {validateLogin, errors} = require('../middlewares/validators/auth');
const { error500 } = require('../utils/errors');

router.post('/login', validateLogin, errors(), async (request, response) => {
	try {
		const result = await login(request.body);
		response.status(result.status).json(result);
	} catch(err) {
		console.log(err);
		response.status(error500.status).json(error500);
	}
});

module.exports = router;