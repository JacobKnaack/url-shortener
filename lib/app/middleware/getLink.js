'use strict';

const { Link } = require('../../model');

async function getLink(req, res, next) {
  let { user_id } = req.user;
  try {
    const records = await Link.get({ user_id });
    res.json({ count: records.length, records });
  } catch {
    console.error('Error fetching url', e);
    next(e);
  }
}

module.exports = getLink;
