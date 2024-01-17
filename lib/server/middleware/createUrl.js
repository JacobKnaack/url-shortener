'use strict';

const { getHash } = require('../../hash');
const { Url } = require('../../model');
const SERVER_REDIRECT_URL = process.env.SERVER_REDIRECT_URL || `http://localhost:${process.env.PORT}`;

async function createUrl(req, res, next) {
  let { url } = req.body;
  console.log('Create URL Request body', req.body);
  try {
    const hash = await getHash(url);
    const record = await Url.create({ url, hash });
    res.json({
      long: url,
      shortened: `${SERVER_REDIRECT_URL}/${record.short}`
    })
  } catch (e) {
    console.error('Create Url Error:', e);
    next(e);
  }
}

module.exports = createUrl;
