const server = require('./index.js');
const supertest = require('supertest');
const mockRequest = supertest(server.app);
const { Url, init, closeConnection } = require('../model');
const { getHash } = require('../hash');

let testRecord = null;

beforeAll(async () => {
  init();
  testRecord = await Url.create({
    url: 'https://google.com',
    hash: await getHash('https://google.com')
  });
});
afterAll(async () => {
  await Url.close();
  await closeConnection();
});

describe('HTTP Server Application', () => {
  test('Should be able to receive a url and return a valid shortened URL', async () => {
    let inputUrl = 'http://this.is.a.url';
    let response = await mockRequest.post('/api/url').send({
      url: inputUrl, 
    });
    expect(response.body.long).toEqual(inputUrl)
    expect(response.body.shortened).toBeTruthy();
  });

  test('Should be able to be redirected to the original url', async () => {
    let response = await mockRequest.get(`/${testRecord.short}`);
    expect(response.status).toBe(301);
    console.log(response.text);
    expect(response.text.includes('google')).toBeTruthy();
  });
});