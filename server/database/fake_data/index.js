const path = require('path');
const mongoose = require('mongoose');
const debug = require('debug')('database');

const resetFakeData = require('./delete_fake_data');
const technologyFakeData = require('./technology');

require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') });
const dbConnection = require('./../db_connection');

const build = () => {
  dbConnection()
    .then(async () => {
      await resetFakeData();
      await technologyFakeData();
    })
    .then(() => {
      mongoose.disconnect();
    })
    .catch((err) => {
      debug(`Error with connection with DB: \n ${err}`);
    });
};

if (process.env.NODE_ENV !== 'test') {
  build();
}

module.exports = build;
