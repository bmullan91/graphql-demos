const _ = require('lodash');
const uuid = require('uuid');
const fixtures = require('./fixtures'); // or 'data-loader-fixtures'

function Table({ name = 'TableName', initalState = {} }) {
  this.name = name
  this._store = initalState;
}

Table.prototype.create = function(args = {}) {
  return new Promise((resolve, reject) => {
    const id = uuid();
    const newRecord = Object.assign({ id }, args);
    this._store[id] = newRecord;
    resolve(newRecord);
  })
};

Table.prototype.read = function(args = {}) {
  return new Promise((resolve, reject) => {
    if(args.id) {
      const record = this._store[args.id];
      if(!record) {
        return reject(new Error(`no record found with id: ${args.id}`));
      }

      // dataLoaders log
      // console.log(`${this.name} table read called: id -> ${args.id}`);

      return resolve(record);
    }

    const results = _.values(this._store);
    const fromIndex = args.from || 0;
    const toIndex = fromIndex + (args.limit || results.length);

    return resolve(results.slice(fromIndex, toIndex));
  })
};

Table.prototype.update = function(args = {}) {
  return new Promise((resolve, reject) => {
    if(!args.id) {
      return reject(new Error('args.id is required'));
    }

    const currentRecord = this._store[args.id];
    const updatedRecord = Object.assign({}, currentRecord, args);
    this._store[args.id] = updatedRecord;
    resolve(updatedRecord);
  })
}

Table.prototype.delete = function(args = {}) {
  return new Promise((resolve, reject) => {
    if(!args.id) {
      return reject(new Error('args.id is required'));
    }

    if(!this._store[args.id]) {
      return reject(new Error(`no record with id: ${args.id}`));
    }

    delete this._store[args.id];
    resolve(true);
  })
}

module.exports = {
  Users: new Table({ name: 'users', initalState: fixtures.users }),
  Events: new Table({ name: 'events', initalState: fixtures.events }),
  Groups: new Table({ name: 'groups', initalState: fixtures.groups })
};
