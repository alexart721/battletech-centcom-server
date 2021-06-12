const associate = require('../models/associations');
const { getUser, createUser, login, logout } = require('./users');

// Set up associations for tables
associate();

module.exports = {
  getUser,
  createUser,
  login,
  logout
}