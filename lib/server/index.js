'use strict';

const express = require('express');
const cors = require('cors');
const Server = require('./Server.js');
const apiRouter = require('./api.js');
const handleRedirect = require('./middleware/handleRedirect.js');

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);
app.get('/:encoding', handleRedirect);

module.exports = new Server(app);
