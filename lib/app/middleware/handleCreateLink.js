'use strict';

const { getHash, isUrl } = require('../../hash');
const { Link } = require('../../model');
const SERVER_REDIRECT_URL = process.env.SERVER_REDIRECT_URL;

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
      let redirectOrigin = SERVER_REDIRECT_URL
      || `${req.protocol}://${req.hostname}:${req.socket.localPort}`;

      res.json({
        long: url,
        shortened: `${redirectOrigin}/${record.short}`
      });
    } else {
      next({ msg: 'Invalid Url', code: 400 });
    }
  } catch (e) {
    next({ code: 400, msg: 'Unable to create link' });
  }
}

module.exports = createLink;
