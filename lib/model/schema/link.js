'use strict';

const ShortUniqueId = require('short-unique-id');
const { randomUUID } = new ShortUniqueId({ length: 10 });

// Mongoose Schema definitions: https://mongoosejs.com/docs/guide.html
const linkSchema = {
  url: { type: String, required: true },
  user_id: { type: String, required: false },
  hash: { type: String, required: true },
  short: { type: String, required: true, default: () => randomUUID() },
  expireAt: { type: Date, required: false, expires: 172800 }
};

module.exports = linkSchema;