'use strict';

require('dotenv').config();
const server = require('./lib/app');
const { init } = require('./lib/model');

const PORT = process.env.PORT || 3001;

init()
.then(() => {
  server.start(PORT);
})
.catch(e => {
  console.warn('Unable to initialize data collections', e);
});