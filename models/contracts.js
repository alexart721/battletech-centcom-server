const sequelize = require('./index');
const { DataTypes } = require('sequelize');
const Campaign = require('./campaigns');
const Operation = require('./operations');

const Contract = sequelize.define('Contract', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  startDate: DataTypes.DATE,
  endDate: DataTypes.DATE
});

Contract.belongsTo(Campaign);
Contract.hasMany(Operation);
Contract.sync({ alter: true });

module.exports = Contract;