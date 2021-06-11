const sequelize = require('./index');
const { DataTypes } = require('sequelize');
const User = require('./users');
const Campaign = require('./campaigns');
const PilotMechPair = require('./pilotMechPairs');
const Mech = require('./mechs');

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

Pilot.belongsTo(User);
Pilot.belongsTo(Campaign);
Pilot.belongsToMany(Mech, { through: PilotMechPair });
Pilot.sync({ alter: true });

module.exports = Pilot;