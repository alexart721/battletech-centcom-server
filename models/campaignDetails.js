const sequelize = require('./index');
const { DataTypes } = require('sequelize');

// This is the junction table between users and campaigns
const CampaignDetail = sequelize.define('CampaignDetail', {
  joinDate: DataTypes.DATE
});

CampaignDetail.sync({ alter: true });

module.exports = CampaignDetail;