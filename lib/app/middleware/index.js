'use strict';

const handleAuth = require('./handleAuth');
const handleRedirect = require('./handleRedirect');
const handleGetLinks = require('./handleGetLinks');
const handleCreateLink = require('./handleCreateLink');
const analyticsTracking = require('./analyticsTracking');
const findUserLinks = require('./findUserLinks');
const handleError = require('./handleError');
const handleAnalytics = require('./handleAnalytics');
const handleBatchAnalytics = require('./handleBatchAnalytics');

module.exports = {
  handleAuth,
  handleRedirect,
  handleGetLinks,
  handleCreateLink,
  handleError,
  analyticsTracking,
  findUserLinks,
  handleAnalytics,
  handleBatchAnalytics,
}
