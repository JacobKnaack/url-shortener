'use strict';

// Mongoose Schema definitions: https://mongoosejs.com/docs/guide.html
const qrCodeSchema = {
  link_id: { type: String, required: true },
  user_id: { type: String, required: true },
  code_data: { type: String, required: true },
  expireAt: { type: Date, required: false, expires: 172800 },
}

module.exports = qrCodeSchema;
