'use strict';

const { MongoI } = require('./Collection.js');
const { Link } = require('../index.js');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongod = null;
beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const MONGO_URL = mongod.getUri();
  MongoI.connect(MONGO_URL);
});
afterAll(async () => {
  await Link.dropRecords();
  await MongoI.disconnect();
  await mongod.stop();
});

describe('Collection Interface', () => {
  describe('MongoDB operations using MongoI', () => {
    test('Should be able to create a collection model and connection', () => {
      let schema = {
        test: String,
      };
      let collection = new MongoI('test', schema);
      expect(collection.model).toBeTruthy();
    });
    test('Should create a mongoose model that can create a new instance', async () => {
      let schema = {
        name: String,
        age: Number
      }
      let collection = new MongoI('test2', schema);
      let schemaInstance = await collection.create({ name: 'test name', age: 100 });
      expect(schemaInstance.name).toBeTruthy();
      expect(schemaInstance.age).toBeTruthy();
      expect(schemaInstance.name).toEqual('test name');
      expect(schemaInstance.age).toEqual(100);
    });
    test('Should create and read a mongoose model instance', async () => {
      let schema = {
        type: String,
      }
      let collection = new MongoI('test3', schema);
      await collection.create({
        type: 'test string'
      });
      let records = await collection.getAll();
      expect(records.length).toEqual(1);
      records = await collection.getOne({ type: 'test string' });
      expect(records.type).toEqual('test string');
    });
    test('Should create and update a mongoose model instance', async () => {
      let schema = {
        testKey: String,
      }
      let collection = new MongoI('test4', schema);
      let instance = await collection.create({ testKey: 'test value' });
      expect(instance.testKey).toEqual('test value');
      instance = await collection.update({testKey: instance.testKey}, {testKey: 'new value'});
      expect(instance.testKey).toEqual('new value');
    });
    test('Should create and delete a mongoose model instance', async () => {
      let schema = {
        name: String,
        notes: [String]
      }
      let collection = new MongoI('test5', schema);
      let instance = await collection.create({
        name: 'test name',
        notes: [
          "test note"
        ]
      });
      expect(instance.name).toEqual('test name');
      expect(instance.notes.length).toEqual(1);
      await collection.delete({ name: 'test name' });
      expect(await collection.getOne({ name: 'test name' })).not.toBeTruthy();
    });
  });

  describe('Testing the URL Mongoose collection', () => {
    test('Should be able to create a valid url record', async () => {
      let record = await Link.create({
        url: 'http://test.com',
        hash: '12345',
      });

      expect(record.url).toEqual('http://test.com');
      expect(record.short).toBeTruthy();
      expect(record.hash).toBeTruthy();
    });

    test('Should be able to create an expiring url', async () => {
      let currentDate = new Date();
      let oldDate = new Date(currentDate);
      let record = await Link.create({
        url: 'http://test2.com',
        hash: 'abcde',
        expireAt: oldDate.setDate(currentDate.getDate() - 2)
      });

      expect(record.url).toEqual('http://test2.com');
      expect(record.short).toBeTruthy();
      expect(record.hash).toBeTruthy();
      expect(record.expireAt).toBeTruthy();
    })
  });
});