process.env.ANALYTICS_API_URL = 'https://test.api';
process.env.TEST_SIGNATURE = 'banana';
const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const { MongoMemoryServer } = require('mongodb-memory-server');
const server = require('../../index.js');
const mockRequest = supertest(server.app);
const { Link, Alias, QRCode, init, closeConnection } = require('../../../model/index.js');

const { setupServer } = require('msw/node');
const { handlers } = require('http/handlers');

let testRecordLink = null;
let testRecordAlias = null;
let testRecordQRCode = null;
let mongod = null;
jest.mock('../../middleware/handleAuth.js', () => require('middleware/handleAuth'));

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  let connectionString = mongod.getUri();
  init({ mongo: { connectionString }});
  testRecordLink = await Link.create({
    url: 'https://test.com',
    user_id: 'test-id'
  });
  testRecordAlias = await Alias.create({
    link_id: testRecordLink._id,
    user_id: 'test-id',
    text: 'valid-alias'
  });
  testRecordQRCode = await QRCode.create({
    link_id: testRecordLink._id,
    user_id: 'test-id',
    data: 'https://website.com'
  });
  const server = setupServer(...handlers);
  server.listen({ onUnhandledRequest: "bypass" });
});
afterAll(async () => {
  await Link.dropRecords();
  await Alias.dropRecords();
  await QRCode.dropRecords();
  await closeConnection();
  await mongod.stop();
});

describe('Server API HTTP Requests', () => {
  test('Should be able to receive a url and return a valid shortened URL', async () => {
    let inputUrl = 'http://test.com';
    let response = await mockRequest.post('/api/link').send({
      url: inputUrl, 
    });
    expect(response.status).toEqual(200);
    expect(response.body.url).toEqual(inputUrl)
    expect(response.body.redirect).toBeTruthy();
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
    let response = await mockRequest.get(`/api/analytics/${testRecordLink.short}`).auth(testToken, { type: 'bearer' });
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
  test('Should be able to delete a Link resource using DELETE /link', async () => {
    let testToken = jwt.sign({ sub: 'test-id' }, process.env.TEST_SIGNATURE);
    let response = await mockRequest.delete(`/api/link/${testRecordLink.id}`).auth(testToken, { type: 'bearer' });
    expect(response.status).toEqual(204);
  });
  test('Should be able to create an alias using POST /alias', async () => {
    let testToken = jwt.sign({ sub: 'test-id' }, process.env.TEST_SIGNATURE);
    let response = await mockRequest.post('/api/alias').auth(testToken, { type: 'bearer' }).send({
      link_id: testRecordLink._id,
      text: 'my-awesome-link',
    });
    expect(response.status).toEqual(200);
    expect(response.body).toBeTruthy();
    expect(response.body.text).toEqual('my-awesome-link');
  });
  test('Should be able to request aliases using GET /alias', async () => {
    let testToken = jwt.sign({ sub: 'test-id' }, process.env.TEST_SIGNATURE);
    let response = await mockRequest.get('/api/alias').auth(testToken, { type: 'bearer'});
    expect(response.status).toEqual(200);
    expect(response.body.count > 0).toBeTruthy();
    expect(response.body.records).toBeTruthy();
  });
  test('Should be able to remove aliases using DELETE /alias/id', async () => {
    let testToken = jwt.sign({ sub: 'test-id' }, process.env.TEST_SIGNATURE);
    let response = await mockRequest.delete(`/api/alias/${testRecordAlias._id}`).auth(testToken, { type: 'bearer' });
    expect(response.status).toEqual(204);
  });
  test('Should be able to create a QR Code using POST /qrcode', async () => {
    let testToken = jwt.sign({ sub: 'test-id' }, process.env.TEST_SIGNATURE);
    let response = await mockRequest.post('/api/qrcode').auth(testToken, { type: 'bearer' }).send({
      link_id: testRecordLink._id,
      data: 'http://test.com'
    });
    expect(response.status).toEqual(200);
    expect(response.body.data).toEqual('http://test.com');
  });
  test('Should be able to request QR Codes using GET /qrcode', async () => {
    let testToken = jwt.sign({ sub: 'test-id' }, process.env.TEST_SIGNATURE);
    let response = await mockRequest.get('/api/qrcode').auth(testToken, { type: 'bearer' });
    expect(response.status).toEqual(200);
    expect(response.body.count > 0).toBeTruthy();
    expect(response.body.records).toBeTruthy();
  });
  test('Should be able to remove QR Code using DELETE /qrcode/id', async () => {
    let testToken = jwt.sign({ sub: 'test-id' }, process.env.TEST_SIGNATURE);
    let response = await mockRequest.delete(`/api/qrcode/${testRecordQRCode._id}`).auth(testToken, { type: 'bearer' });
    expect(response.status).toEqual(204);
  });
});