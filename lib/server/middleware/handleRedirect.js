'use strict';

// const { decode } = require('../../encoding');
const { Url } = require('../../model');

const handleRedirect = async (req, res, next) => {
  try {
    const { encoding } = req.params;
    const record = await Url.get({ short: encoding });
    res.redirect(301, record.url);
  } catch (e) {
    next(e);
  }
}

module.exports = handleRedirect;
