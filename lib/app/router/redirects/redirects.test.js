process.env.TEST_SIGNATURE = 'redirect-test-secret';
const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const { MongoMemoryServer } = require('mongodb-memory-server');
const server = require('../../index.js');
const mockRequest = supertest(server.app);
const { Link, init, closeConnection } = require('../../../model/index.js');

let testRecord = null;
let mongod = null;
jest.mock('../../middleware/handleAuth.js', () => require('middleware/handleAuth'));

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  let connectionString = mongod.getUri();
  init({ mongo: { connectionString } });
  testRecord = await Link.create({
    url: 'https://google.com',
  });
});
afterAll(async () => {
  await Link.dropRecords();
  await closeConnection();
  await mongod.stop();
});

describe('Server Encoding Redirect', () => {
  test('Should be able to be redirected to the original url', async () => {
    let response = await mockRequest.get(`/${testRecord.short}`);
    expect(response.status).toBe(302);
    expect(response.text.includes('google')).toBeTruthy();
  });
  test('Should be able to fetch metadata for redirects', async () => {
    let testToken = jwt.sign({ sub: 'test-id' }, process.env.TEST_SIGNATURE);
    let response = await mockRequest.post(`/metadata`)
      .auth(testToken, { type: 'bearer' })
      .send({ url: 'https://www.google.com'});

    expect(response.status).toEqual(200);
    expect(response.body.title).toBeTruthy();
    expect(response.body.description).toBeTruthy();
    expect(response.body.image).toBeTruthy();
  });
});