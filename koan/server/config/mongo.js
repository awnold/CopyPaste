'use strict';

/**
 * MongoDB configuration using generators (with the help of co-mongo package).
 * You can require this config file in your controllers and start using named collections directly.
 * See /controllers directory for sample usage.
 */

var mongodb = require('mongodb'),
    connect = mongodb.connect,
    config = require('./config');

// extending and exposing top co-mongo namespace like this is not optimal but it saves the user from one extra require();
module.exports = mongodb;

/**
 * Opens a new connection to the mongo database, closing the existing one if exists.
 */
mongodb.connect = async function () {
  if (mongodb.db) {
    await mongodb.db.close();
  }

  // export mongo db instance
  var db = mongodb.db = await connect(config.mongo.url);

  // export default collections
  mongodb.savedPastes = db.collection('savedPastes');
};
