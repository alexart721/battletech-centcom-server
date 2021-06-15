const { sequelize } = require('./index');
const { DataTypes } = require('sequelize');

const Pilot = sequelize.define('Pilot', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  birth: DataTypes.DATE,
  death: DataTypes.DATE,
  edge: DataTypes.INTEGER,
  plusArmor: DataTypes.INTEGER,
  plusStructure: DataTypes.INTEGER,
  plusMovement: DataTypes.INTEGER,
  accuracyShort: {
    type: DataTypes.INTEGER,
    defaultValue: 2
  },
  accuracyMed: {
    type: DataTypes.INTEGER,
    defaultValue: 4
  },
  accuracyLong: {
    type: DataTypes.INTEGER,
    defaultValue: 6
  },
  plusDamageShort: DataTypes.INTEGER,
  plusDamageMed: DataTypes.INTEGER,
  plusDamageLong: DataTypes.INTEGER,
  baseTargetNum: {
    type: DataTypes.INTEGER,
    defaultValue: 4
  },
  totalMovementModifier: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
});

Pilot.sync();

module.exports = Pilot;