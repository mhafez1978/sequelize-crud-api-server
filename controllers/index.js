const connectT0DBThen = require('../database/db.js');
const models = require('../models/index');

// ############# Static Routes ##################
const mainController = (req, res) => {
  res.send('main route call response from Main Controller');
};

// ############# DB Check ##################
const dbCheckerController = async (req, res) => {
  await connectT0DBThen
    .authenticate()
    .then((results) => {
      console.log('##########################');
      console.log('Houston we have lift off\nDatabase server is online ....');
      console.log('##########################');
      res.send('Houston we have lift off\nDatabase server is online ....');
    })
    .catch((err) => {
      console.log('##########################');
      console.log(
        'Houston we have a problem connecting.\nCheck your DB connection settings ...'
      );
      console.log('##########################');
      res.send('Houston we have a problem connecting.\nCheck your DB connection settings ...');
    });
};

// ############# All Models Sync ##################
// we could use Model.Sync() this will only sync the model
const setupModelsController = async (req, res) => {
  await connectT0DBThen.sync({ force: true }).then((results) => {
    console.log(results);
    res.send('database now have a new tables ... operation completed ok ...');
  });
};

// ############# Single Model Sync ##################
// if you want to manually create a singular model
// this to create only Users table in db.
const setupUsersModelController = async (req, res) => {
  await models.User.sync({ force: true })
    .then((results) => {
      console.log(results);
      res.send('Users table was created');
    })
    .catch((err) => {
      console.log(err);
      res.send('Something went wrong here Users table was not created ...');
    });
};

// ############# Admin DB describe ##################
// gets all table names in db
const describeDBController = async (req, res) => {
  await connectT0DBThen
    .getQueryInterface()
    .showAllTables()
    .then((results) => {
      if (results.length > 0) {
        console.log(results);
        res.json(results);
      } else {
        res.send(
          'Did not find any Models or Tables in DB , Why not create some ...'
        );
      }
    })
    .catch((err) => {
      console.log(err);
      res.send(
        'there was an erro sorry we are not able to describe this db at this time ...'
      );
    });
};

// ############# Drop all Models in DB ##################
const deleteAllModelsController = async (req, res) => {
  await connectT0DBThen
    .drop()
    .then((results) => {
      console.log(results);
      res.send('All Models were deleted ok');
    })
    .catch((err) => {
      console.log(err);
      res.send(
        'Sorry we were not able to complete your request to drop all tables, nothing was dropped ...'
      );
    });
};

// ############# Drop Single Model in DB ##################
const deleteUsersModelController = async (req, res) => {
  await models.User.drop()
    .then((results) => {
      console.log(results);
      res.send('Users Model Table in DB was deleted/dropped ok ...');
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};

module.exports = {
  mainController,
  dbCheckerController,
  setupModelsController,
  setupUsersModelController,
  describeDBController,
  deleteUsersModelController,
  deleteAllModelsController,
};
