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
  constructor(name, schema) {
    super(mongoose.model(
      name,
      new mongoose.Schema(schema)
    ));
  }

  static connect(uri) {
    return mongoose.connect(uri);
  }

  static disconnect() {
    return mongoose.disconnect();
  }

  static getConnection() {
    return mongoose.connection;
  }

  create(values, pt) {
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
    try {
      return this.model.find({});
    } catch (e) {
      return Promise.reject(e);
    }
  }
  update(filter, values) {
    try {
      return this.model.findOneAndUpdate(filter, values, { new: true });
    } catch (e) {
      return Promise.reject(e);
    }
  }
  delete(filter) {
    try {
      return this.model.deleteOne(filter);
    } catch (e) {
      return Promise.reject(e);
    }
  }
  dropRecords() {
    this.model.deleteMany({});
  }
}

/**
 * Postgres Interface
 */
class PostgresI extends Collection {
  constructor(model, connection) {
    super(model, connection);
  }

  get() {}
  create() {}
  update() {}
  delete() {}
}

module.exports = {
  PostgresI,
  MongoI
}

