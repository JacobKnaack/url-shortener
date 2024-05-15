module.exports = {
  AuthenticationClient: jest.fn().mockImplementation(({ domain, clientId}) => {
    return {
      oauth: {
        passwordGrant: jest.fn(({ username, password, realm}) => {
          return new Promise((resolve, reject) => {
            if (username && password && realm) {
              resolve({ user: {username, password} });
            } else {
              reject('invalid auth0 passwordGrant params');
            }
          })
        })
      },
      database: {
        signUp: jest.fn(({ email, password, connection}) => {
          return new Promise((resolve, reject) => {
            if (email && password && connection) {
              resolve({ user: { email, password }});
            } else {
              reject('Invalid auth0 signUp params');
            }
          })
        })
      }
    }
  }),
}