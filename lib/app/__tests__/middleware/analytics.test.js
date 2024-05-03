const { handleAnalytics, handleBatchAnalytics } = require('../../middleware');
const MiddlewareParams = require('http/MiddlewareParams');

const { setupServer } = require('msw/node');
const { handlers } = require('http/handlers');

beforeAll(() => {
  const server = setupServer(...handlers);
  server.listen({ onUnhandledRequest: "bypass" });
});

describe('Analytics middleware features', () => {
  test('Should return fetch analytics for a single link', async () => {
    let { request, response, next } = new MiddlewareParams();
    request.record = { short: '123456' };

    await handleAnalytics(request, response, next);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({ records: expect.any(Array) });
    expect(next).not.toHaveBeenCalled();
  });
  test('Should fetch a batch of link record analytics', async () => {
    let { request, response, next } = new MiddlewareParams();
    request.records = { links: [
      {short: '123456'},
      {short: '123456'}
    ]}

    await handleBatchAnalytics(request, response, next);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({ records: { links: expect.any(Array), traffic: expect.any(Array) }});
    expect(next).not.toHaveBeenCalled();
  });
});