const sequelize = require('./index');
const { DataTypes } = require('sequelize');

const Campaign = sequelize.define('Campaign', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  startDate: DataTypes.DATE,
  endDate: DataTypes.DATE
});

Campaign.sync();

module.exports = Campaign;