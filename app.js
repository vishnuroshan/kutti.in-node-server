
require('dotenv').config();
require('./db/connection');
const express = require('express');
const app = express();
const morgan = require('morgan');
const routes = require('./routes');
const path = require('path');
const expressip = require('express-ip');
const cors = require('cors');
const helmet = require('helmet');

//? app configs
app.use(helmet());
app.use(cors());
app.use(expressip().getIpInfoMiddleware);
app.disable('x-powered-by');
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('tiny'));

//? routes
app.use('/auth/', routes.auth);
app.use('/', routes.url);
app.use('/user/', routes.users);

module.exports = app;
