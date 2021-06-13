const sequelize = require('./index');
const { DataTypes } = require('sequelize');

// This is the junction table between users and campaigns
const CampaignDetail = sequelize.define('CampaignDetail', {
  joinDate: DataTypes.DATE,
  pilotModRollsRemain: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    validate: {
      isIn: [[0, 1]]
    }
  },
  mechCredRollsRemain: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    validate: {
      isIn: [[0, 1]]
    }
  }
});

CampaignDetail.sync({ alter: true });

module.exports = CampaignDetail;