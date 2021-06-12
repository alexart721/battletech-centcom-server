const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./router');
const PORT = process.env.PORT || 3000;

const corsConfig = {
  origin: 'https://battletech-centcom-client.vercel.app', // For Heroku deployment
  // origin: 'http://localhost:3000', // For local testing
  credentials: true
};

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