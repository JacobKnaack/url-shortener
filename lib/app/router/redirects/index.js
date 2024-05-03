'use strict';

const express = require('express');
const router = express.Router();
const {
  handleEncoding,
  handleRedirect, 
  analyticsTracking
} = require('../../middleware');

router.get('/:encoding', handleEncoding, analyticsTracking, handleRedirect);

module.exports = router;