require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

// When a user is validated, request.user will contain their information
// Otherwise, this will force an error
const handleAuth = (rejectUnauthenticated) => (request, response, next) => {
  
  function valid(error, user) {
    if (error && rejectUnauthenticated) {
      next({ msg: 'Not Authorized', code: 401, error });
    } else {
      request.user = user || {};
      next();
    }
  }
    
  try {
    const token = request.headers?.authorization?.split(' ')[1];
    jwt.verify(token, getKey, {}, valid);
  } catch (error) {
    next({ msg: 'Not Authorized', code: 401, error });
  }
}


// =============== HELPER METHODS, pulled from the jsonwebtoken documentation =================== //
//                 https://www.npmjs.com/package/jsonwebtoken                                     //
// Define a client, this is a connection to YOUR auth0 account, using the URL given in your dashboard
const client = jwksClient({
  // this url comes from your app on the auth0 dashboard
  jwksUri: process.env.JWKS_URI,
});

// Match the JWT's key to your Auth0 Account Key so we can validate it
async function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    if (err) {
      callback(err);
    } else {
      const signingKey = key.publicKey || key.rsaPublicKey;
      callback(null, signingKey);
    }
  });
}

module.exports = handleAuth;