'use strict';

const mongoose = require('mongoose');

class Collection {
  constructor(model) {
    this.model = model;
    this.db = null;
  }

  connect(db) {
    this.db = db;
  }
}

/**
 * MongoDB Interface
 */
class MongoI extends Collection {
  constructor(model, uri) {
    super(model);
  }

  static connect(uri) {
    mongoose.connect(uri);
  }

  static disconnect() {
    mongoose.disconnect();
  }

  create(values) {
    return this.model.create(values);
  }
  get(values) {
    return this.model.findOne(values);
  }
  getAll() {
    return this.model.find({});
  }
  close() {
    return this.model.deleteMany({});
  } 
}

/**
 * Postgres Interface
 */
class PostgresI extends Collection {
  constructor(model, connection) {
    super(model, connection);
  }

  get() {

  }
}

module.exports = {
  PostgresI,
  MongoI
}

