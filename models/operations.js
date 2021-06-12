const sequelize = require('./index');
const { DataTypes } = require('sequelize');

const Operation = sequelize.define('Operation', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  objectives: DataTypes.TEXT,
  startDate: DataTypes.STRING,
  endDate: DataTypes.STRING
});

Operation.sync({ alter: true });

module.exports = Operation;