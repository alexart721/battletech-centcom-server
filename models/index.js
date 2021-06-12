const { DATABASE_URL, DB } = process.env;
const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize(`${DATABASE_URL}`); // For local testing
const sequelize = new Sequelize(`${DATABASE_URL}`, { dialectOptions: { ssl: true } }); // For Heroku deployment

sequelize.authenticate().then(res => {
  console.log(`Connection established to ${DB}!`);
}).catch(err => {
  console.error(`Unable to connect to ${DB}, error: `, err);
});

module.exports = sequelize;