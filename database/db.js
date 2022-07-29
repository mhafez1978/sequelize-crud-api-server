const Sequelize = require('sequelize');
const connectT0DBThen = new Sequelize(
  'sequelize-crud-db',
  'root',
  '123456789!!!',
  {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 3000,
      idle: 1000,
    },
  }
);
module.exports = connectT0DBThen;
