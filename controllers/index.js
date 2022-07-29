const { Op } = require('sequelize');
const connectT0DBThen = require('../database/db.js');
const models = require('../models/index');
const UsersSample = require('../sample/data');

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
      res.send(
        'Houston we have a problem connecting.\nCheck your DB connection settings ...'
      );
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

const createUserController = async (req, res) => {
  const { fname, lname, uname, dob, email } = req.body;
  if (
    !fname ||
    !uname ||
    !dob ||
    !email ||
    fname === '' ||
    uname === '' ||
    dob === null ||
    email === ''
  ) {
    return res.send(
      'first name, username, date of birth, and email all required to create a user in db'
    );
  } else {
    await models.User.create({
      'First Name': fname,
      'Last Name': lname,
      Username: uname,
      'Date of Birth': dob,
      Email: email,
    })
      .then((results) => {
        console.log('###########################');
        console.log(results);
        console.log('###########################');
        res.send(results);
      })
      .catch((err) => {
        console.log('###########################');
        console.log(err);
        console.log('###########################');
        res.send(err);
      });
  }
};

const bulkCreateUsersController = async (req, res) => {
  const user = UsersSample.map(async (each) => {
    await models.User.create({
      fname: each.fname,
      lname: each.lname,
      username: each.username,
      dob: each.dob,
      email: each.email,
    });
  });
  console.log(user);
  res.send(`We added of users to the db ...`);
};

const getAllUsersController = async (req, res) => {
  const data = await models.User.findAll()
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};

const findUserByIdController = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const user = await models.User.findOne({ where: { userId: id } })
    .then((user) => {
      if (!user || user === null) {
        res.send('No user found by the provided id ...');
      } else {
        console.log(user);
        res.send(user);
      }
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};

const findUserByEmailController = async(req,res) => {
	const email = req.body.email
	const user = await models.User.findOne({where:{email:email}})
	.then(user=>{
		if(!user || user === null){
			res.send("We can't find user matches the email provided ...")
		}else{
			console.log(user)
			res.send(user)
		}
	})
	.catch(err=>{
		console.log(err)
		res.send(err)
	})
}


module.exports = {
  mainController,
  dbCheckerController,
  setupModelsController,
  setupUsersModelController,
  describeDBController,
  deleteUsersModelController,
  deleteAllModelsController,
  createUserController,
  bulkCreateUsersController,
  getAllUsersController,
  findUserByIdController,
  findUserByEmailController
};
