const sequelize = require('./index');
const { DataTypes } = require('sequelize');

const Contract = sequelize.define('Contract', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  startDate: DataTypes.DATE,
  endDate: DataTypes.DATE
});

Contract.sync({ alter: true });

module.exports = Contract;