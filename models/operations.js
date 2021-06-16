const { sequelize } = require('./index');
const { DataTypes } = require('sequelize');

const Operation = sequelize.define('Operation', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  objectives: DataTypes.ARRAY(DataTypes.STRING),
  startDate: DataTypes.STRING,
  endDate: DataTypes.STRING
});

Operation.sync();

module.exports = Operation;