'use strict';

require('dotenv').config();
const express = require('express');
const { getHash } = require('../hash');
const { Url } = require('../model');

const router = express.Router();
const SERVER_REDIRECT_URL = process.env.SERVER_REDIRECT_URL || `http://localhost:${process.env.PORT}`;

router.post('/url', async (req, res, next) => {
  let { url } = req.body;
  try {
    const hash = await getHash(url);
    const record = await Url.create({ url, hash });
    res.json({
      long: req.body.url,
      shortened: `${SERVER_REDIRECT_URL}/${record.short}`
    });
  } catch(e) {
    console.error(e);
    next(e);
  }
});

router.get('/:encoding', (req, res, next) => {
  res.send('Fetching analytics');
});

router.get('/url:user_id', async (req, res, next) => {
  let { user_id } = req.params;
  try {
    const records = await Url.get({ user_id });
    res.json({ count: records.length, records });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;