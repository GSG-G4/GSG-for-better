const path = require('path');
const mongoose = require('mongoose');
const debug = require('debug')('database');

const resetFakeData = require('./delete_fake_data');
const technologyFakeData = require('./technology');
const teamFakeData = require('./team');
const goalsData = require('./goal');
const userFakeData = require('./user');
const proposedGoalFakeData = require('./proposed_goal');
const progressData = require('./progress');

require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') });
const dbConnection = require('./../db_connection');

const build = () => new Promise((resolve, reject) => {
  dbConnection()
    .then(async () => {
      await resetFakeData();
      await technologyFakeData();
      await teamFakeData();
      await userFakeData();
      await proposedGoalFakeData();
      await goalsData();
      await progressData();
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
