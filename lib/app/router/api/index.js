'use strict';

require('dotenv').config();
const express = require('express');
const {
  handleAuth,
  handleGetLinks,
  handleCreateLink,
  findUserLinks,
  handleAnalytics,
  handleBatchAnalytics
} = require('../../middleware');

const router = express.Router();
 
router.get('/link', handleAuth(true), handleGetLinks);
router.post('/link', handleAuth(false), handleCreateLink);

router.get('/analytics', handleAuth(true), findUserLinks, handleBatchAnalytics);
router.get('/analytics/:encoding', handleAuth(true), handleAnalytics);

module.exports = router;