'use strict';

const { Url } = require('../../model');

async function getUrl(req, res, next) {
  let { user_id } = req.params;
  try {
    const records = await Url.get({ user_id });
    res.json({ count: records.length, records });
  } catch {
    console.error('Error fetching url', e);
    next(e);
  }
}

module.exports = getUrl;
