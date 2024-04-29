'use strict';

require('dotenv').config();
const express = require('express');
const {
  handleAuth,
  getLink,
  createLink,
} = require('../middleware');

const router = express.Router();
 
router.get('/link', handleAuth(true), getLink);
router.post('/link', handleAuth(false), createLink);
router.get('/:encoding', (req, res, next) => {
  res.send('Fetching analytics');
});

module.exports = router;