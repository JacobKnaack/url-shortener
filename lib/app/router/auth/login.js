'use strict';

require('dotenv').config();
const auth0 = require('auth0');

const auth0Client = new auth0.AuthenticationClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
});

module.exports = async (req, res, next) => {
  try {
    const encodedString = req.headers.authorization.split(' ')[1];
    const decodedString = Buffer.from(encodedString, 'base64').toString('utf-8');
    const [username, password] = decodedString.split(":");
    const response = await auth0Client.oauth.passwordGrant({
      username,
      password,
      realm: 'Username-Password-Authentication'
    });
    res.status(200).send(response.data);
  } catch(err) {
    next({ msg: 'Unable to login', error: err, code: 401 });
  }
}
