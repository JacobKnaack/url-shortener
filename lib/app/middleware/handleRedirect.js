'use strict';

// const { decode } = require('../../encoding');
const { Link } = require('../../model');

const isEncoding = (string) => {
  return string.match(new RegExp(/^[0-9a-zA-Z]{10}$/ig));
}

const handleRedirect = async (req, res, next) => {
  console.log('redirecting to url');
  try {
    const { encoding } = req.params;
    if (isEncoding(encoding)) {
      const record = await Link.getOne({ short: encoding });
      res.redirect(301, record.url);
    } else {
      res.status(404).send('Not found');
    }
  } catch (e) {
    next(e);
  }
}

module.exports = handleRedirect;
