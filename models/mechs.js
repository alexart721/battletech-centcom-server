const sequelize = require('./index');
const { DataTypes } = require('sequelize');

const Mech = sequelize.define('Mech', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.TEXT,
    defaultValue: 'Operational',
    validate: {
      isIn: [['Operational', 'In for repairs', 'Destroyed']]
    }
  },
  size: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isIn: [[1, 2, 3, 4]]
    }
  },
  movement: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  jumpCapable: DataTypes.BOOLEAN,
  overHeatLimit: DataTypes.INTEGER,
  damageShort: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  damageMed: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  damageLong: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  armor: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    allowNull: false
  },
  structure: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    allowNull: false
  }
}, {
  tableName: 'Mechs'
});

Mech.sync({ alter: true });

module.exports = Mech;