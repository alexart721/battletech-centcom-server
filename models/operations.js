const sequelize = require('./index');
const { DataTypes } = require('sequelize');
const Contract = require('./contracts');
const Turn = require('./turns');

const Operation = sequelize.define('Operation', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  objectives: DataTypes.TEXT,
  startDate: DataTypes.STRING,
  endDate: DataTypes.STRING
});

Operation.belongsTo(Contract);
Operation.hasMany(Turn);
Operation.sync({ alter: true });

module.exports = Operation;