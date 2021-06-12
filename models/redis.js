'use-strict';
const redis = require('redis');
// const path = require('path'); // Comment out for Heroku commits
// require('dotenv').config({ path: path.join(__dirname, '..', '/.env') }); // Comment out for Heroku commits
const { REDIS_URL } = process.env;
const redisClient = redis.createClient(REDIS_URL);

redisClient.on('error', err => {
  console.log(`Error connecting to Redis database: ${err}`);
});
redisClient.on('connect', () => {
  console.log(`Successfully connected to Redis database at ${REDIS_URL}`);
});

module.exports = redisClient;