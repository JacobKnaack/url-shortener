'use strict';

require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const Server = require('./Server.js');
const { api, redirects } = require('./router');
const { handleError } = require('./middleware');
const publicDir = path.resolve('./public');

const app = express();

// TODO: Add whitelist to cross origin resource list.
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', express.static(publicDir));
app.use('/api', api);
app.use(redirects);

app.use(handleError);

module.exports = new Server(app);
