'use strict';

const { Link } = require('../../model');

async function getLink(req, res, next) {
  let { sub } = req.user;
  try {
    const records = await Link.getAll({ user_id: sub });
    res.json({ count: records.length, records });
  } catch(e) {
    console.error('Error fetching url', e);
    next(e);
  }
}

module.exports = getLink;
