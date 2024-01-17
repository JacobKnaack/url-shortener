'use strict';

require('dotenv').config();
const express = require('express');
const { handleAuth, getUrl, createUrl } = require('../middleware');

const router = express.Router();
 
router.get('/url', handleAuth, getUrl);
router.post('/url', createUrl);
router.get('/:encoding', (req, res, next) => {
  res.send('Fetching analytics');
});

module.exports = router;