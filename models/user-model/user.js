const { DataTypes } = require('sequelize');
const connectT0DBThen = require('../../database/db');

const User = connectT0DBThen.define(
  'User',
  {
    // Model attributes are defined here
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    fname: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user first name',
    },
    lname: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'username',
    },
    dob: {
      type: DataTypes.DATEONLY,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      defaultValue: 'email.domain.com',
    },
  },
  {
    // Other model options go here
    createdAt: 'Created At',
    updatedAt: 'Last Updated',
    onDelete: 'cascade',
  }
);

module.exports = User;
