const sequelize = require('./index');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
  firstName: DataTypes.TEXT,
  lastName: DataTypes.TEXT,
  email: DataTypes.TEXT,
  password: DataTypes.TEXT
});

User.sync();

module.exports = User;