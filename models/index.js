const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '/.env') });
const { DATABASE_URL } = process.env;
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(`${DATABASE_URL}`);

sequelize.authenticate().then(res => {
  console.log('Connection established to btcentcomdb!');
}).catch(err => {
  console.error('Unable to connect to btcentcomdb, error: ', err);
});

module.exports = sequelize;