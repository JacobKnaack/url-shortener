'use strict';

const handleGet = (model) => async (req, res, next) => {
  let { sub } = req.user;
  try {
    const records = await model.getAll({ user_id: sub });
    res.json({ count: records.length, records });
  } catch (e) {
    console.error('Error fetching url', e);
    next({ error: e });
  }
}

module.exports = handleGet;