const supertest = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const server = require('../../index.js');
const mockRequest = supertest(server.app);
const { Link, init, closeConnection } = require('../../../model/index.js');

let testRecord = null;
let mongod = null;

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
});