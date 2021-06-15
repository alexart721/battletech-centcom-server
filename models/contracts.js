const { sequelize } = require('./index');
const { DataTypes } = require('sequelize');

const Contract = sequelize.define('Contract', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  objectives: DataTypes.ARRAY(DataTypes.STRING),
  startDate: DataTypes.DATE,
  endDate: DataTypes.DATE
});

Contract.sync();

module.exports = Contract;