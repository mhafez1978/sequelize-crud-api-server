const { DataTypes } = require('sequelize');
const connectT0DBThen = require('../../database/db');

const User = connectT0DBThen.define(
  'User',
  {
    // Model attributes are defined here
    'User Id': {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    'First Name': {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue('First Name');
        return rawValue;
      },
      set(value) {
        this.setDataValue('First Name', value);
      },
    },
    'Last Name': {
      type: DataTypes.STRING,
      // allowNull defaults to true
      get() {
        const rawValue = this.getDataValue('Last Name');
        return rawValue;
      },
      set(value) {
        this.setDataValue('Last Name', value);
      },
    },
    'User Username': {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue('Last Name');
        return rawValue;
      },
    },
    'Date of Birth': {
      type: DataTypes.DATEONLY,
    },
    'User Email': {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isUnique: function (email, done) {
          User.find({ where: { 'User Email': email } }).done(function (
            err,
            user
          ) {
            if (err) {
              done(err);
            }
            if (user) {
              done(new Error('Email already registered'));
            }
            done();
          });
        },
      },
      get() {
        const rawValue = this.getDataValue('User Email');
        return rawValue;
      },
      set(value) {
        this.setDataValue('User Email', value);
      },
    },
  },
  {
    // Other model options go here
    createdAt: 'Created At',
    updatedAt: 'Last Modified At',
    onDelete: 'cascade',
  }
);

module.exports = User;
