'use strict';

require('dotenv').config();
const { MongoI, PostgresI } = require('./Collection.js');
const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL;

beforeAll(() => {
  MongoI.connect(MONGO_URL);
});
afterAll(() => {
  MongoI.disconnect();
});

describe('Collection Interface', () => {

  test('Should be able to create a collection model and connection', () => {
    let model = mongoose.model('test', new mongoose.Schema({
      test: String,
    }));
    let testCollection = new MongoI(model);
    expect(testCollection.model).toBeTruthy();
  });
});