'use strict';

require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const Server = require('./Server.js');
const { api } = require('./router');
const { handleRedirect, analyticsTracking, handleError } = require('./middleware/');
const publicDir = path.resolve('./public');

const app = express();

// TODO: Add whitelist to cross origin resource list.
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', express.static(publicDir));
app.use('/api', api);
app.get('/:encoding', analyticsTracking, handleRedirect);

app.use(handleError);

module.exports = new Server(app);
