'use strict';

async function handleRedirect(req, res, next) {
  try {
    const { record } = req;
    res.redirect(302, record.url);
  } catch (e) {
    next({ code: 404, msg: 'not found', error: e });
  }
}

module.exports = handleRedirect;
