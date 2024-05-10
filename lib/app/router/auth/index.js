'use strict';

const express = require('express');
const router = express.Router();
const login = require('./login');
const signup = require('./signup');

router.post('/login', login);
router.post('/signup', signup);

module.exports = router;
