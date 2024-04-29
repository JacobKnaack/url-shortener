'use strict';

const handleAuth = require('./handleAuth');
const handleRedirect = require('./handleRedirect');
const getLink = require('./getLink');
const createLink = require('./createLink');
const analyticsTracking = require('./analyticsTracking');

module.exports = {
  handleAuth,
  handleRedirect,
  getLink,
  createLink,
  analyticsTracking
}
