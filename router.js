const express = require('express');
const router = express.Router();
const { getUser, createUser, login } = require('./controllers/users');
const authMiddleware = require('./middlewares/auth');

// Used for Heroku deployment testing
// router.get('/', (req, res) => {
//   res.status(200);
//   res.send('Hello, stranger!');
// });

router.get('/profile', authMiddleware, getUser);
router.post('/register', createUser);
router.post('/login', login);
router.get('*', (req, res) => {
  // Update this to go to custom 404, if time allows
  res.status(404).send('Sorry, not found 😞');
});

module.exports = router;