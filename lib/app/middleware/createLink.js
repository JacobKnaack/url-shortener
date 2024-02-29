'use strict';

const { getHash } = require('../../hash');
const { Link } = require('../../model');
const SERVER_REDIRECT_URL = process.env.SERVER_REDIRECT_URL || `http://localhost:${process.env.PORT}`;

async function createLink(req, res, next) {
  let { url } = req.body;
  try {
    const hash = await getHash(url);
    const record = await Link.create({ url, hash, expireAt: Date.now() });
    res.json({
      long: url,
      shortened: `${SERVER_REDIRECT_URL}/${record.short}`
    });
  } catch (e) {
    console.error('Create Url Error:', e);
    next(e);
  }
}

module.exports = createLink;
