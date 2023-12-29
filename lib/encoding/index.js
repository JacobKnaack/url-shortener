'use strict';

const zlib = require('zlib');

function createEncoding(string) {
  const compressed = zlib.gzipSync(string);
  return compressed.toString('base64');
}

function decode(encodedBase64) {
  const compressed = Buffer.from(encodedBase64, 'base64');
  return zlib.gunzipSync(compressed).toString('utf8');
}

module.exports = {
  createEncoding,
  decode
}
