const login = require('./login');
const signup = require('./signup');
const MiddlewareParams = require('http/MiddlewareParams');

describe('Signup and Login functions', () => {
  test('Should return a response from auth0 on signup', async () => {
    const { request, response, next } = new MiddlewareParams();
    request.body = {
      email: 'test',
      password: 'test'
    }

    await signup(request,response,next);
    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.send).toHaveBeenCalled();
  });
  test('Should return a response from auth0 on login', async() => {
    const { request, response, next } = new MiddlewareParams();
    request.headers.authorization = `Basic ${Buffer.from('test:test').toString('base64')}`;

    await login(request, response, next);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.send).toHaveBeenCalled();
  });
  test('Should return a 401 when no credentials are present on login headers', async () => {
    const { request, response, next } = new MiddlewareParams();

    await login(request, response, next);
    expect(next).toHaveBeenCalledWith({ msg: 'Unable to login', code:401, error: expect.any(Object) });
  });
});