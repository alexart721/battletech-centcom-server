const sequelize = require('./index');
const { DataTypes } = require('sequelize');

// This is the junction table between mechs and turns
const TurnDetail = sequelize.define('TurnDetail', {
  mechOverheat: DataTypes.INTEGER,
  mechOverheatShutdown: DataTypes.INTEGER,
  mechDamageArmor: DataTypes.INTEGER,
  mechDamageStructure: DataTypes.INTEGER,
  pilotEdge: DataTypes.INTEGER
});

TurnDetail.sync({ alter: true });

module.exports = TurnDetail;