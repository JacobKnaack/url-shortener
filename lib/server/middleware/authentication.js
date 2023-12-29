'use strict';

const authentication = (req, res, next) => {
  if (req.oidc.isAuthenticated) {
    next();
  } else {
    next({ statusCode: 401, message: 'no auth credentials present'});
  }
}

module.exports = authentication;