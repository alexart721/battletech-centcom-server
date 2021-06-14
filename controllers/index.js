const associate = require('../models/associations');
const sequelize = require('../models');
const { getUser, createUser, login, logout, updateUser } = require('./users');
const { getCampaign, getCampaigns, createCampaign, updateCampaign } = require('./campaigns');

// Set up associations for tables
associate();

// Sync models
sequelize.sync(); // For change { alter: true } or wipe and change { force: true }

module.exports = {
  getUser,
  createUser,
  updateUser,
  login,
  logout,
  getCampaign,
  getCampaigns,
  createCampaign,
  updateCampaign
}