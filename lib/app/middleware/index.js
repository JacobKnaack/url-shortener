'use strict';

const handleAuth = require('./handleAuth');
const handleRedirect = require('./handleRedirect');
const analyticsTracking = require('./analyticsTracking');
const findUserLinks = require('./findUserLinks');
const handleError = require('./handleError');
const handleAnalytics = require('./handleAnalytics');
const handleBatchAnalytics = require('./handleBatchAnalytics');
const handleEncoding = require('./handleEncoding');

module.exports = {
  handleAuth,
  handleRedirect,
  handleError,
  analyticsTracking,
  findUserLinks,
  handleAnalytics,
  handleBatchAnalytics,
  handleEncoding,
}
