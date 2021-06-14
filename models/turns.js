const sequelize = require('./index');
const { DataTypes } = require('sequelize');

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

Turn.sync();

module.exports = Turn;