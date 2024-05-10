require('dotenv').config();
const auth0 = require('auth0');

const auth0Client = new auth0.AuthenticationClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
});

module.exports = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  auth0Client.database.signUp({
    email,
    password,
    connection: 'Username-Password-Authentication'
  }).then(response => {
     res.status(201).send(response);
  }).catch(err => {
    next({ msg: 'Unable to register new user', code: 400, error: err });
  });
}
