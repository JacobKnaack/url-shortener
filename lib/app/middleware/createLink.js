'use strict';

const { getHash, isUrl } = require('../../hash');
const { Link } = require('../../model');
const SERVER_REDIRECT_URL = process.env.SERVER_REDIRECT_URL || `http://localhost:${process.env.PORT}`;

async function createLink(req, res, next) {
  let { url } = req.body;
  let { sub } = req.user;
  try {
    if(isUrl(url)) {
      const hash = await getHash(url);
      const linkValues = { url, hash };
      if (sub) {
        linkValues.user_id = sub;
      } else {
        linkValues.expireAt = Date.now();
      }
      const record = await Link.create(linkValues);
      res.json({
        long: url,
        shortened: `${SERVER_REDIRECT_URL}/${record.short}`
      });
    } else {
      res.status(400).send('Invalid Url');
    }
  } catch (e) {
    console.error('Create Url Error:', e);
    next(e);
  }
}

module.exports = createLink;
