'use strict';

const { Schema  } = require('mongoose');

// Mongoose Schema definitions: https://mongoosejs.com/docs/guide.html
const aliasSchema = new Schema({
  link_id: {
    type: Schema.Types.ObjectId,
    ref: "link",
    required: true
  },
  user_id: { type: String, required: true },
  text: { type: String, required: true },
  expireAt: { type: Date, required: false, expires: 172800 },
}, { timestamps: true });

// TODO: validate text field, should be all lowercase, url encoded characters.

module.exports = aliasSchema;
