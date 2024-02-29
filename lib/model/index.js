'use strict';

require('dotenv').config();
const { MongoI } = require('./Collection.js');
const linkSchema = require('./link.js');

const POSTGRES_URL = process.env.POSTGRES_URL;
const MONGO_URL = process.env.MONGO_URL;
console.log(`
* ./lib/model
** TODO **
Configure models for Urls stored in mongo :: MONGODB URL: ${MONGO_URL}
Configure model for analytics data stored in Postgresql :: POSTGRES URL: ${POSTGRES_URL}
`);


module.exports = {
  init: (params) => {
    return new Promise((resolve, reject) => {
      MongoI.connect(params?.mongo?.connectionString || MONGO_URL).then(() => {
        resolve();
      });
    });
  },
  closeConnection: () => {
    return MongoI.disconnect();
  },
  Link: new MongoI('link', linkSchema),
}
