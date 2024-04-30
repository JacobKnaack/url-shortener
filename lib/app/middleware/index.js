'use strict';

const handleAuth = require('./handleAuth');
const handleRedirect = require('./handleRedirect');
const handleGetLink = require('./handleGetLink');
const handleCreateLink = require('./handleCreateLink');
const analyticsTracking = require('./analyticsTracking');
const findUserLink = require('./findUserLink');
const handleError = require('./handleError');
const handleAnalytics = require('./handleAnalytics');

module.exports = {
  handleAuth,
  handleRedirect,
  handleGetLink,
  handleCreateLink,
  analyticsTracking,
  handleAnalytics,
  handleError,
  findUserLink
}
