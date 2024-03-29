const supertest = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const server = require('../index.js');
const mockRequest = supertest(server.app);
const { Link, init, closeConnection } = require('../../model');
const { getHash } = require('../../hash/index.js');

let testRecord = null;
let mongod = null;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  let connectionString = mongod.getUri();
  init({ mongo: { connectionString }});
  testRecord = await Link.create({
    url: 'https://google.com',
    hash: await getHash('https://google.com')
  });
});
afterAll(async () => {
  await Link.dropRecords();
  await closeConnection();
  await mongod.stop();
});

describe('HTTP Server Application', () => {
  test('Should be able to receive a url and return a valid shortened URL', async () => {
    let inputUrl = 'http://this.is.a.url';
    let response = await mockRequest.post('/api/link').send({
      url: inputUrl, 
    });
    expect(response.body.long).toEqual(inputUrl)
    expect(response.body.shortened).toBeTruthy();
  });

  test('Should be able to be redirected to the original url', async () => {
    let response = await mockRequest.get(`/${testRecord.short}`);
    expect(response.status).toBe(301);
    expect(response.text.includes('google')).toBeTruthy();
  });
  xtest('Should be able to get analytics data associated with a given encoding', () => {
    expect(true).toBe(false);
  });
});