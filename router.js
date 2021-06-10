const express = require('express');
const router = express.Router();
const { getUser } = require('./controllers/users');

router.get('/', (req, res) => {
  res.status(200);
  res.send('Hello, stranger!');
});

router.get('/user', getUser);

router.get('*', (req, res) => {
  res.status(404).send('Sorry, not found 😞');
});

module.exports = router;