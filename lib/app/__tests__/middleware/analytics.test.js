const { handleAnalytics } = require('../../middleware');
const Middleware = require('http/Middleware');

const { setupServer } = require('msw/node');
const { handlers } = require('http/handlers');

beforeAll(() => {
  const server = setupServer(...handlers);
  server.listen();
})

describe('Analytics middleware features', () => {
  test('Should return a valid response on fetch', async () => {
    let { request, response, next } = new Middleware();
    request.params.encoding = '123456';

    await handleAnalytics(request, response, next);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith(expect.any(Array));
    expect(next).not.toHaveBeenCalled();
  });
});