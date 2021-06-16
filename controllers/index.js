const associate = require('../models/associations');
const { sequelize } = require('../models');
const { getUser, createUser, login, logout, updateUser } = require('./users');
const { getCampaign, getAllCampaigns, getCurrentCampaigns, getPastCampaigns, createCampaign, updateCampaign } = require('./campaigns');
const { createMech, getAllMechs, getMech, getAssignedMech, assignMech } = require('./mechs');
const { createPilot, getAllPilots, getPilot, getAssignedPilot, assignPilot } = require('./pilots');
const { getContract, getCampaignCurrentContract, getCampaignPastContracts, createContract, updateContract } = require('./contracts');

// Set up associations for tables
associate();

// Sync models
sequelize.sync({ force: true }); // For change { alter: true } or wipe and change { force: true }

module.exports = {
  getUser,
  createUser,
  updateUser,
  login,
  logout,
  getCampaign,
  getAllCampaigns,
  getCurrentCampaigns,
  getPastCampaigns,
  createCampaign,
  updateCampaign,
  createMech,
  getAllMechs,
  getAssignedMech,
  getMech,
  assignMech,
  createPilot,
  getAllPilots,
  getPilot,
  getAssignedPilot,
  assignPilot,
  getContract,
  getCampaignCurrentContract,
  getCampaignPastContracts,
  createContract,
  updateContract
}