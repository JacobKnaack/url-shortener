const { MongoMemoryServer } = require('mongodb-memory-server');
const { Link, init, closeConnection } = require('../../../model');
const { getHash } = require('../../../hash');
const { findUserLinks } = require('../../middleware');
const MiddlewareParams = require('http/MiddlewareParams');

let mongod = null;

beforeAll(async() => {
  mongod = await MongoMemoryServer.create();
  let connectionString = mongod.getUri();
  init({ mongo: { connectionString } });
  testRecord = await Link.create({
    url: 'https://test.com',
    hash: await getHash('https://test.com'),
    user_id: 'test_user'
  });
});

afterAll(async () => {
  await Link.dropRecords();
  await closeConnection();
  await mongod.stop();
});

describe('Link reading middleware', () => {
  test('Should be able to get find a link for a test user', async () => {
    let { request, response, next} = new MiddlewareParams();
    request.user = {}
    request.user.sub = testRecord.user_id;
    // setRequest('user.sub', testRecord.user_id);
    request.params.encoding = testRecord.short;
    // setRequest('params.encoding', testRecord.short);

    await findUserLinks(request, response, next);
    expect(request.records).toBeTruthy();
    expect(request.records.links).toBeTruthy();
    expect(request.records.links.length).toEqual(1);
    expect(next).toHaveBeenCalled();
  });
})