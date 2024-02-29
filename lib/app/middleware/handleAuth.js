'use strict';

const authentication = (req, res, next) => {
  if (req.oidc.isAuthenticated()) {
    // TODO: find Profile if user has authenticated with auth0
    next();
  } else {
    next({ statusCode: 401, message: 'no auth credentials present'});
  }
}

module.exports = authentication;