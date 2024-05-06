'use strict';

const { Schema  } = require('mongoose');

// Mongoose Schema definitions: https://mongoosejs.com/docs/guide.html
const aliasSchema = new Schema({
  link_id: {
    type: Schema.Types.ObjectId,
    ref: "link",
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: function() {
      return (/^[a-z]+(?:-[a-z]+)*$/.test(this.text));
    }
  },
  expireAt: { type: Date, required: false, expires: 172800 },
}, { timestamps: true });

module.exports = aliasSchema;
