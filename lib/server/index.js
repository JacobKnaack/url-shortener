'use strict';

require('dotenv').config();
const path = require('path');
const express = require('express');
const { auth } = require('express-openid-connect');
const cors = require('cors');
const Server = require('./Server.js');
const { api } = require('./router');
const handleRedirect = require('./middleware/handleRedirect.js');
const publicDir = path.resolve('./public');

const authConfig = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.AUTH0_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_URL
}

const app = express();
// TODO: Add whitelist to cross origin resource list.
app.use(cors());
app.use(auth(authConfig));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', express.static(publicDir));
app.use('/api', api);
app.get('/:encoding', handleRedirect);

module.exports = new Server(app);
