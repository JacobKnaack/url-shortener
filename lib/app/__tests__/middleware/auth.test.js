const { handleAuth } = require('../../middleware/');
const Middleware = require('http/Middleware');
const jwt = require('jsonwebtoken');

describe('Testing authentication middleware', () => {
  test('Should send an error when no token is present', () => {
    let { request, response, next } = new Middleware();
    let authRequired = handleAuth(true);

    authRequired(request, response, next);
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({ msg: 'Not Authorized' })
    );
  });

  test('Should send an error when an invalid auth header us present on the request', () => {
    let { request, response, next, setRequest } = new Middleware();
    let authRequired = handleAuth(true);

    setRequest('headers.authorization', 'bearer NOT_A_TOKEN');
    authRequired(request, response, next);
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({ msg: 'Not Authorized' })
    );
  });

  test('Should send an error when an invalid token is present in the header', (done) => {
    let { request, response, setRequest} = new Middleware();
    let authRequired = handleAuth(true);
    setRequest('headers.authorization', `Bearer ${jwt.sign({ user: 'test user' }, 'INVALID_SECRET')}`);

    authRequired(request, response, (error) => {
      expect(error).toEqual(
        expect.objectContaining({ msg: 'Not Authorized' })
      );
      done();
    });
  });

  test('Should allow requests that don\'t require authentication headers', () => {
    let { request, response, next } = new Middleware();
    let noAuthRequired = handleAuth(false);

    noAuthRequired(request, response, next);
    expect(next).toHaveBeenCalled();
  });
});
