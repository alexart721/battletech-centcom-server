/* eslint-disable no-console */
import { Sequelize } from 'sequelize';

const { DATABASE_URL, DB_NAME } = process.env;
export const { Op } = Sequelize;

// const sequelize = new Sequelize(`${DATABASE_URL}`); // For local testing
// For Heroku deployment
export const sequelize = new Sequelize(`${DATABASE_URL}`, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

sequelize.authenticate().then(() => {
  console.log(`Connection established to ${DB_NAME}!`);
}).catch((err) => {
  console.error(`Unable to connect to ${DB_NAME}, error: `, err);
});
