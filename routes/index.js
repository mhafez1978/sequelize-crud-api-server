// ############# Bringing in App controllers ##################
const controllers = require('../controllers/index');

// ############# Static Routes ##################
const main = (req, res) => {
  return controllers.mainController(req, res);
};

// ############# DB Check ##################
const dbchecker = (req, res) => {
  return controllers.dbCheckerController(req, res);
};

// ############# All Models Sync ##################
const setupModels = (req, res) => {
  return controllers.setupModelsController(req, res);
};

// ############# Single Model Sync ##################
const setupUsers = (req, res) => {
  return controllers.setupUsersModelController(req, res);
};

// ############# admin DB describe ##################
const describeDB = (req, res) => {
  return controllers.describeDBController(req, res);
};

// ############# admin delete / destroy single Model: User ##################
const deleteUsersModel = (req, res) => {
  return controllers.deleteUsersModelController(req, res);
};

// ############# admin delete / destroy All Models ##################
const deleteAllModels = (req, res) => {
  return controllers.deleteAllModelsController(req, res);
};

// ############# admin create a 1 new user and save in Users Model/Table ##################
const createUser = (req, res) => {
  return controllers.createUserController(req, res);
};

const createSampleUsers = (req, res) => {
  return controllers.bulkCreateUsersController(req, res);
};

const getAllUsers = (req, res) => {
  return controllers.getAllUsersController(req, res);
};

const findUserById = (req, res) => {
  return controllers.findUserByIdController(req, res);
};

const findUserByEmail = (req,res) => {
	return controllers.findUserByEmailController(req, res);
}

module.exports = {
  main,
  dbchecker,
  setupModels,
  setupUsers,
  describeDB,
  deleteUsersModel,
  deleteAllModels,
  createUser,
  createSampleUsers,
  getAllUsers,
  findUserById,
  findUserByEmail,

};
