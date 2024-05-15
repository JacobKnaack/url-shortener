'use strict';

const express = require('express');
const router = express.Router();
const {
  handleEncoding,
  analyticsTracking,
  handleAuth
} = require('../../middleware');
const handleRedirect = require('./handleRedirect');
const handleMetadata = require('./handleMetadata');

// TODO - add route for getting metadata for a given url
router.post('/metadata', handleAuth(true), handleMetadata);
router.get('/:encoding', handleEncoding, analyticsTracking, handleRedirect);

module.exports = router;