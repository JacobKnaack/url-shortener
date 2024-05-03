const { MongoMemoryServer } = require('mongodb-memory-server');
const { handleEncoding } = require('../../middleware');
const { Link, Alias, init, closeConnection } = require('../../../model');
const MiddlewareParams = require('http/MiddlewareParams');

let testLink = null;
let testAlias = null;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  let connectionString = mongod.getUri();
  init({ mongo: { connectionString } });
  testLink = await Link.create({
    url: 'http://website.com',
    user_id: 'test-user'
  });
  testAlias = await Alias.create({
    text: 'test-alias',
    link_id: testLink._id,
    user_id: 'test-user',
  });
});
afterAll(async () => {
  await Link.dropRecords();
  await Alias.dropRecords();
  await closeConnection();
  await mongod.stop();
});

describe('Route Encoding Middleware', () => {
  test('Should call next when a valid encoding is found', async () => {
    let { request, response, next } = new MiddlewareParams();
    request.params.encoding = testLink.short;

    await handleEncoding(request, response, next);
    expect(next).toHaveBeenCalled();
    expect(request.record).toBeTruthy();
    expect(request.record._id.toString()).toEqual(testLink._id.toString());
  });
  test('Should call next when request uses a valid alias', async () => {
    let { request, response, next } = new MiddlewareParams();
    request.params.encoding = testAlias.text;

    await handleEncoding(request, response, next);
    expect(next).toHaveBeenCalled();
    expect(request.record).toBeTruthy();
    expect(request.record._id.toString()).toEqual(testLink._id.toString());
  });
  test('Should call next with an error if in-valid encoding or alias is attached', async () => {
    let { request, response, next} = new MiddlewareParams();
    request.params.encoding = 'not an alias';

    await handleEncoding(request, response, next);
    expect(next).toHaveBeenCalledWith({
      code: 404,
      msg: 'no link found',
      error: expect.any(Object)
    });
  });
});