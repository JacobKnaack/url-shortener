'use strict';

require('dotenv').config();
const server = require('./lib/server');
const { init } = require('./lib/model');

const PORT = process.env.PORT || 3001;

init().then(() => {
  server.start(PORT);
});