'use strict';

const { Link } = require('../../model');

async function handleGetLinks(req, res, next) {
  let { sub } = req.user;
  try {
    const records = await Link.getAll({ user_id: sub });
    res.json({ count: records.length, records });
  } catch(e) {
    console.error('Error fetching url', e);
    next({ error: e });
  }
}

module.exports = handleGetLinks;
