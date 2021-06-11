const sequelize = require('./index');
const { DataTypes } = require('sequelize');
const Campaign = require('./campaigns');
const CampaignDetail = require('./campaignDetails');
const Pilot = require('./pilots');

const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

User.belongsToMany(Campaign, { through: CampaignDetail });
User.hasMany(Pilot);
User.sync({ alter: true });

module.exports = User;