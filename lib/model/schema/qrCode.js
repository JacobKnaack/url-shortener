'use strict';

const { Schema } = require('mongoose');

// Mongoose Schema definitions: https://mongoosejs.com/docs/guide.html
const qrCodeSchema = new Schema({
  link_id: {
    type: Schema.Types.ObjectId,
    ref: 'link',
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  data: {
    type: String,
    required: true
  },
  expireAt: { type: Date, required: false, expires: 172800 },
}, { timestamps: true });

module.exports = qrCodeSchema;
