const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const { MongoMemoryServer } = require('mongodb-memory-server');
const server = require('../../index.js');
const mockRequest = supertest(server.app);
const { Link, init, closeConnection } = require('../../../model/index.js');
const { getHash } = require('../../../hash/index.js');

const { setupServer } = require('msw/node');
const { handlers } = require('http/handlers');

let testRecord = null;
let mongod = null;
process.env.TEST_SIGNATURE = 'banana';
jest.mock('../../middleware/handleAuth.js', () => require('middleware/handleAuth'));

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  let connectionString = mongod.getUri();
  init({ mongo: { connectionString }});
  testRecord = await Link.create({
    url: 'https://test.com',
    hash: await getHash('https://test.com'),
    user_id: 'test-id'
  });
  const server = setupServer(...handlers);
  server.listen({ onUnhandledRequest: "bypass" });
});
afterAll(async () => {
  await Link.dropRecords();
  await closeConnection();
  await mongod.stop();
});

describe('Server API HTTP Requests', () => {
  test('Should be able to receive a url and return a valid shortened URL', async () => {
    let inputUrl = 'http://this.is.a.url';
    let response = await mockRequest.post('/api/link').send({
      url: inputUrl, 
    });
    expect(response.status).toEqual(200);
    expect(response.body.long).toEqual(inputUrl)
    expect(response.body.shortened).toBeTruthy();
  });
  test('Should receive a 401 when fetching links without auth token', async () => {
    let response = await mockRequest.get('/api/link');
    expect(response.status).toEqual(401);
    expect(response.body.message).toEqual('Not Authorized');
  });
  test('Should receive a list of links when a token is present', async () => {
    let testToken = jwt.sign({ sub: 'test-id' }, process.env.TEST_SIGNATURE);
    let response = await mockRequest.get('/api/link').auth(testToken, { type: 'bearer' });
    expect(response.status).toEqual(200);
    expect(response.body.count).toEqual(1);
  });
  test('Should be able to get analytics data associated with a given link encoding', async () => {
    let testToken = jwt.sign({ sub: 'test-id' }, process.env.TEST_SIGNATURE);
    let response = await mockRequest.get(`/api/analytics/${testRecord.short}`).auth(testToken, { type: 'bearer' });
    expect(response.status).toEqual(200);
    expect(response.body.records).toBeTruthy();
  });
  test('Should return a list of analytics object associated with the authenticated user', async () => {
    let testToken = jwt.sign({ sub: 'test-id' }, process.env.TEST_SIGNATURE);
    let response = await mockRequest.get(`/api/analytics/`).auth(testToken, { type: 'bearer' });
    expect(response.status).toEqual(200);
    expect(response.body.records.links).toBeTruthy();
    expect(response.body.records.traffic).toBeTruthy();
  });
});