const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./router');
const PORT = process.env.PORT || 3000;

const whitelist = ['https://battletech-centcom-client.vercel.app', 'http://localhost:3000'];

const corsConfig = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
};
app.get('/', (_, res) => { res.status(200).send('Hello, stranger!') });
app.use(cors(corsConfig));
app.use(express.json());
app.use(router);

app.listen(PORT, (err) => {
  if (err) {
    console.log(`😞 Sorry, something went wrong! ${err}`);
  } else {
    console.log(`Server listening on port ${PORT}!`);
  }
});