'use strict';

const { Schema } = require('mongoose');
const { getHash, isUrl } = require('../../hash');
const ShortUniqueId = require('short-unique-id');
const { randomUUID } = new ShortUniqueId({ length: 10 });
const SERVER_REDIRECT_URL = process.env.SERVER_REDIRECT_URL;
const PORT = process.env.PORT;

// Mongoose Schema definitions: https://mongoosejs.com/docs/guide.html
const linkSchema = new Schema({
  url: { type: String, required: true },
  user_id: { type: String, required: false },
  hash: { type: String, required: false },
  short: { type: String, required: true, default: () => randomUUID() },
  expireAt: { type: Date, required: false, expires: 172800 }
}, { timestamps: true });


linkSchema.pre('validate', function(next) {
  if (isUrl(this.url)) {
    next();
  } else {
    throw new Error('Url Validation Error: ', this.url);
  }
});
linkSchema.pre('save', async function (next) {
  try {
    this.hash = await getHash(this.url);
    if (!this.user_id) {
      this.expireAt = Date.now();
    }
  } catch (e) {
    throw new Error('Unable to hash url: ', this.url);
  }
});
linkSchema.virtual('redirect').get(function() {
  let redirectOrigin = SERVER_REDIRECT_URL || `http://localhost:${PORT}/${this.short}`;
    // || `${req.protocol}://${req.hostname}:${req.socket.localPort}`;
  return redirectOrigin;
});

module.exports = linkSchema;
