'use strict';

const mongoose = require('mongoose');
// const sequelize = require('sequelize');

class Collection {
  constructor(model) {
    this.model = model;
    this.db = null;
  }

  addConnection(db) {
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
    return mongoose.connect(uri);
  }

  static disconnect() {
    mongoose.disconnect();
  }

  create(values) {
    if (values) {
      return this.model.create(values);
    }
    return Promise.reject('No Values given');
  }
  get(values) {
    if (values) {
      return this.model.findOne(values);
    }
    return Promise.reject('No Values given');
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

