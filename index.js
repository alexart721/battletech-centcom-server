require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./router');
const PORT = process.env.PORT || 3000;

const corsConfig = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors()); // app.use(cors(corsConfig));
app.use(express.json());
app.use(router);

app.listen(PORT, (err) => {
  if (err) {
    console.log(`😞 Sorry, something went wrong! ${err}`);
  } else {
    console.log(`Server listening!`);
  }
});