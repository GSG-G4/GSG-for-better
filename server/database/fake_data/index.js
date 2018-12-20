const path = require('path');
const mongoose = require('mongoose');
const debug = require('debug')('database');

const resetFakeData = require('./delete_fake_data');
const technologyFakeData = require('./technology');
const goalsData = require('./goal');

require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') });
const dbConnection = require('./../db_connection');

const build = () => new Promise((resolve, reject) => {
  dbConnection()
    .then(async () => {
      await resetFakeData();
      await technologyFakeData();
      await goalsData();
    })
    .then(resolve)
    .catch((err) => {
      debug(`Error with connection with inserting fake data: \n ${err}`);
      reject(err);
    });
});

if (process.env.NODE_ENV !== 'test') {
  build()
    .then(() => {
      debug('Done!: database has been built');
      mongoose.disconnect();
    });
}

module.exports = build;
