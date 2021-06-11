const sequelize = require('./index');
const { DataTypes } = require('sequelize');
const Operation = require('./operations');
const TurnDetail = require('./turnDetails');
const Mech = require('./mechs');

const Turn = sequelize.define('Turn', {
  turnNum: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  // Duration of a turn in seconds
  duration: {
    type: DataTypes.INTEGER,
    defaultValue: 10
  }
});

Turn.belongsTo(Operation);
Turn.belongsToMany(Mech, { through: TurnDetail });
Turn.sync({ alter: true });

module.exports = Turn;