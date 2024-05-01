const jwt = require('jsonwebtoken');

module.exports = (rejectUnauthorized) => jest.fn((request, response, next) => {
  try {
    const token = request.headers?.authorization?.split(' ')[1];
    let testUser = jwt.verify(token, process.env.TEST_SIGNATURE);
    request.user = testUser;
    next();
  } catch (error) {
    if (rejectUnauthorized) {
      next({ msg: 'Not Authorized', code: 401, error });
    } else {
      request.user = {};
      next();
    }
  }
})