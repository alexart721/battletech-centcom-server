/* eslint-disable no-console */
import redis from 'redis';

const bootRedis = (REDIS_URL) => {
  const redisClient = redis.createClient(REDIS_URL);

  redisClient.on('error', (err) => {
    console.log(`Error connecting to Redis database: ${err}`);
  });
  redisClient.on('connect', () => {
    console.log(`Successfully connected to Redis database at ${REDIS_URL}`);
  });

  return redisClient;
};

export default bootRedis;
