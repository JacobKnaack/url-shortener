'use strict';

require('dotenv').config();
const { MongoI } = require('./Collection/Collection.js');
const { link, alias, qrCode } = require('./schema');

const POSTGRES_URL = process.env.POSTGRES_URL;
const MONGO_URL = process.env.MONGO_URL;
console.log(`
* ./lib/model *
** MONGO CONNECTION STRING:: ${MONGO_URL} **
** POSTGRES CONNECTION STRING :: ${POSTGRES_URL} **
`);


module.exports = {
  init: (params) => {
    return new Promise((resolve, reject) => {
      MongoI.connect(params?.mongo?.connectionString || MONGO_URL)
      .then(() => {
        resolve();
      })
      .catch(e => reject(e));
    });
  },
  closeConnection: () => {
    return MongoI.disconnect();
  },
  Link: new MongoI('link', link),
  Alias: new MongoI('alias', alias),
  QRCode: new MongoI('qr_code', qrCode),
}
