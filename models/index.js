// const path = require('path'); // Comment out for Heroku commits
// require('dotenv').config({ path: path.join(__dirname, '..', '/.env') }); // Comment out for Heroku commits
const { DATABASE_URL, DB } = process.env;
const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize(`${DATABASE_URL}`); // Comment out for Heroku commits
const sequelize = new Sequelize(`${DATABASE_URL}`, { ssl: { rejectUnauthorized: false } }); // Use for Heroku commits

sequelize.authenticate().then(res => {
  console.log(`Connection established to ${DB}!`);
}).catch(err => {
  console.error(`Unable to connect to ${DB}, error: `, err);
});

module.exports = sequelize;