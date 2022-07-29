// ############# dependencies for app to work ##################
require('dotenv').config();
const express = require('express');
const app = express();
const myRouter = express.Router();
const routes = require('./routes/index');
const PORT = process.env.PORT;

// ############# Middleware  ##################
app.use(express.json());
app.use(myRouter);

// main route call -- index route
myRouter.get('/', routes.main);

// ############# Static Routes ##################
// check db connection settings -- validate connection for app
myRouter.get('/dbcheck', routes.dbchecker);

// ############# Create Models in DB Setup Routes ##################
myRouter.put('/setup', routes.setupModels);
// create a single Model in db ; in this case Users
myRouter.put('/setup/users', routes.setupUsers);

// ############# Admin DB Routes ##################
// get info on all Models in database
myRouter.get('/dbadmin/describe', routes.describeDB);

// ############# Drop / Destroy / Delete ##################
myRouter.delete('/admin/delete/models', routes.deleteAllModels)
myRouter.delete('/admin/delete/model/users', routes.deleteUsersModel);

// ############# create a single new user , store in users table in db route ##################


// ############# Web Server to serve App ##################
app.listen(PORT, () => {
  console.log(`your server now serving on http://localhost:${PORT}`);
});
