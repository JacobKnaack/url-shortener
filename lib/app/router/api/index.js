'use strict';

require('dotenv').config();
const express = require('express');
const { Link } = require('../../../model');
const {
  handleAuth,
  findUserLinks,
  handleAnalytics,
  handleBatchAnalytics,
  handleEncoding,
} = require('../../middleware');
const { 
  handleGet,
  handlePost,
  handleDelete,
} = require('../handlers');

const router = express.Router();
router.get('/link', handleAuth(true), handleGet(Link));
router.post('/link', handleAuth(false), handlePost(Link));
router.delete('/link/:id', handleAuth(true), handleDelete(Link));

router.get('/analytics', handleAuth(true), findUserLinks, handleBatchAnalytics);
router.get('/analytics/:encoding', handleAuth(true), handleEncoding, handleAnalytics);

module.exports = router;