const supertest = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const server = require('../../index.js');
const mockRequest = supertest(server.app);
const { Link, init, closeConnection } = require('../../../model/index.js');
const { getHash } = require('../../../hash/index.js');

let testRecord = null;
let mongod = null;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  let connectionString = mongod.getUri();
  init({ mongo: { connectionString }});
  testRecord = await Link.create({
    url: 'https://test.com',
    hash: await getHash('https://test.com')
  });
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
    expect(response.text).toEqual('Not Authorized');
  });
  xtest('Should be able to get analytics data associated with a given link encoding', async () => {
    let response = await mockRequest.get(`/api/${testRecord.short}`).auth('TOKEN', { type: 'bearer' });

    expect(response.status).toEqual(200);
  });
});