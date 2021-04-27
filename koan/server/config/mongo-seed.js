'use strict';

var mongo = require('./mongo'),
    config = require('./config'),
    ObjectID = mongo.ObjectID;

/**
 * Populates the database with seed data.
 * @param overwrite Overwrite existing database even if it is not empty.
 */
async function seed(overwrite) {
  if (overwrite) {
    // first remove any leftover data in collections
    var collerrmsg = 'ns not found' /* indicates 'collection not found' error in mongo which is ok */;
    for (var collection in mongo) {
      if (mongo[collection].drop) {
        try {
          await mongo[collection].drop();
        } catch (err) {
          if (err.message !== collerrmsg) {
            throw err;
          }
        }
      }
    }

    // now populate collections with fresh data
    await mongo.savedPastes.insert(savedPastes);
  }
}

// declare seed data
var savedPastes = [
  {
    _id: new ObjectID(),
    "paste": "This is the first seed savedPaste!"
  },
  {
    _id: new ObjectID(),
    "paste": "This is the second seed savedPaste!"
  }
];

// export seed data and seed function
seed.savedPastes = savedPastes;
module.exports = seed;
