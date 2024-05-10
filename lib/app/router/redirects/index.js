'use strict';

const express = require('express');
const router = express.Router();
const {
  handleEncoding,
  analyticsTracking
} = require('../../middleware');
const handleRedirect = require('./handleRedirect');

router.get('/:encoding', handleEncoding, analyticsTracking, handleRedirect);

module.exports = router;