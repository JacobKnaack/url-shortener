'use strict';

// Mongoose Schema definitions: https://mongoosejs.com/docs/guide.html
const aliasSchema = {
  link_id: { type: String, required: true },
  user_id: { type: String, required: false },
  text: { type: String, required: true },
  expireAt: { type: Date, required: false, expires: 172800 },
}

module.exports = aliasSchema;
