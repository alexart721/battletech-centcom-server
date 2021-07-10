/* eslint-disable no-console */
import http from 'http';
import express, { json } from 'express';
import cors from 'cors';
import bootRedis from './redis';
import * as allRoutes from './routes';

const { REDIS_URL } = process.env;
const PORT = process.env.PORT || 3000;
const app = express();
const whitelist = ['https://battletech-centcom-client.vercel.app', 'http://localhost:3000'];
const redisClient = bootRedis(REDIS_URL);

const corsConfig = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.locals.redisClient = redisClient;
app.get('/', (_, res) => res.status(200).send('Hello, stranger!'));
app.use(cors(corsConfig));
app.use(json());
Object.entries(allRoutes).forEach(([prefix, router]) => {
  app.use(prefix, router);
});
app.get('*', (_, res) => {
  res.status(404).send('Sorry, not found 😞');
});

const server = http.createServer(app);

server.listen(PORT, (err) => {
  if (err) {
    console.log(`😞 Sorry, something went wrong! ${err}`);
  } else {
    console.log(`Server listening on port ${PORT}!`);
  }
});

export default server;
