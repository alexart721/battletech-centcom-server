const sequelize = require('./index');
const { DataTypes } = require('sequelize');

// This is the junction table between pilots and mechs
const PilotMechPair = sequelize.define('PilotMechPair', {
  unionDate: DataTypes.DATE,
  divorceDate: DataTypes.DATE
});

PilotMechPair.sync({ alter: true });

module.exports = PilotMechPair;