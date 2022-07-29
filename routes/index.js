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
const deleteAllModels = (req,res) => {
	return controllers.deleteAllModelsController(req, res);
}

module.exports = {
  main,
  dbchecker,
  setupModels,
  setupUsers,
  describeDB,
  deleteUsersModel,
  deleteAllModels
};
