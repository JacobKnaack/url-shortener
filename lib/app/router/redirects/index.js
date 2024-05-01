'use strict';

const express = require('express');
const router = express.Router();
const { handleRedirect, analyticsTracking } = require('../../middleware');

router.get('/:encoding', analyticsTracking, handleRedirect);

module.exports = router;