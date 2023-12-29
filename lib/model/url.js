'use strict';

const mongoose = require('mongoose');
const ShortUniqueId = require('short-unique-id');
const { randomUUID } = new ShortUniqueId({ length: 10 });

const urlSchema = new mongoose.Schema({
  url: { type: String, required: true },
  user_id: { type: String, required: false },
  hash: { type: String, required: true },
  short: { type: String, required: true, default: () => randomUUID() }
});

module.exports = mongoose.model('url', urlSchema);