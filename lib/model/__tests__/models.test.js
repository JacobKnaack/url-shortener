require('dotenv').config();
const { MongoMemoryServer } = require('mongodb-memory-server');
const { Link, QRCode, Alias, init, closeConnection } = require('../index');
const { getHash } = require('../../hash');

let mongod = null;
let linkId = null;
let aliasId = null;
let qrCodeId = null;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  let connectionString = mongod.getUri();
  init({ mongo: { connectionString } });
});
afterAll(async () => {
  await Link.dropRecords();
  await QRCode.dropRecords();
  await Alias.dropRecords();
  await closeConnection();
  await mongod.stop();
});

describe('Model Collections', () => {
  test('Should be able to CREATE Link, QRCOde, and Alias', async () => {
    let url = 'http://test-link.com';
    let testLink = await Link.create({
      url,
      hash: await getHash(url),
      user_id: 'test-user-id'
    });
    let testAlias = await Alias.create({
      link_id: testLink._id,
      user_id: 'test-user-id',
      text: 'my-awesome-link',
    });
    let testQRCode = await QRCode.create({
      link_id: testLink._id,
      user_id: 'test-user-id',
      data: url,
    });

    linkId = testLink._id;
    aliasId = testAlias._id;
    qrCodeId = testQRCode._id;
    expect(testLink.url).toEqual(url);
    expect(testAlias.link_id.toString()).toEqual(testLink._id.toString());
    expect(testAlias.text).toEqual('my-awesome-link');
    expect(testQRCode.link_id.toString()).toEqual(testLink._id.toString());
    expect(testQRCode.data).toEqual(testLink.url);
  });
  test('Should prevent CREATE for Alias or QRCode without a valid link id', async () => {
    try {
      await Alias.create({
        link_id: '123456',
        user_id: 'test-user-id',
        text: 'my-awesome-link',
      });
    } catch(e) {
      expect(e).toBeTruthy();
      expect(e._message.includes('validation failed')).toBeTruthy();
    }
    try {
      await QRCode.create({
        link_id: '123456',
        user_id: 'test-user-id',
        data: 'http://link.com'
      })
    } catch(e) {
      expect(e).toBeTruthy();
      expect(e._message.includes('validation failed')).toBeTruthy();
    }
  });

  test('Should be able to READ Link, QRCode, and Alias', async () => {
    let testLink = await Link.getOne({ user_id: 'test-user-id' });
    let testAlias = await Alias.getOne({ user_id: 'test-user-id' });
    let testQRCode = await QRCode.getOne({ user_id: 'test-user-id' });

    expect(testLink.url).toEqual('http://test-link.com');
    expect(testAlias.text).toEqual('my-awesome-link');
    expect(testQRCode.data).toEqual('http://test-link.com');
  });
  test('Should be able to DELETE Link, QRCode, and Alias', async () => {
    let linkDeleted = await Link.delete({ _id: linkId });
    let aliasDeleted = await Alias.delete({ _id: aliasId });
    let qrCodeDeleted = await QRCode.delete({ _id: qrCodeId });

    expect(linkDeleted.deletedCount).toEqual(1);
    expect(aliasDeleted.deletedCount).toEqual(1);
    expect(qrCodeDeleted.deletedCount).toEqual(1);
  });
});