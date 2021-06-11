const sequelize = require('./index');
const { DataTypes } = require('sequelize');
const User = require('./users');
const CampaignDetail = require('./campaignDetails');
const Pilot = require('./pilots');
const Mech = require('./mechs');
const Contract = require('./contracts');

const Campaign = sequelize.define('Campaign', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  startDate: DataTypes.DATE,
  endDate: DataTypes.DATE
});

Campaign.belongsToMany(User, { through: CampaignDetail });
Campaign.hasMany(Pilot);
Campaign.hasMany(Mech);
Campaign.hasMany(Contract);
Campaign.sync({ alter: true });

module.exports = Campaign;