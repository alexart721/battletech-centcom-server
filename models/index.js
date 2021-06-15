const { DATABASE_URL, DB } = process.env;
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

const sequelize = new Sequelize(`${DATABASE_URL}`); // For local testing
// For Heroku deployment
// const sequelize = new Sequelize(`${DATABASE_URL}`, {
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false
//     }
//   }
// });

sequelize.authenticate().then(res => {
  console.log(`Connection established to ${DB}!`);
}).catch(err => {
  console.error(`Unable to connect to ${DB}, error: `, err);
});

module.exports = { sequelize, Op };