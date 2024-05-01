'use strict';

require('dotenv').config();
const express = require('express');
const {
  handleAuth,
  handleGetLink,
  handleCreateLink,
  findUserLink,
  handleAnalytics,
} = require('../../middleware');

const router = express.Router();
 
router.get('/link', handleAuth(true), handleGetLink);
router.post('/link', handleAuth(false), handleCreateLink);
router.get('/:encoding', handleAuth(true), findUserLink, handleAnalytics);

module.exports = router;