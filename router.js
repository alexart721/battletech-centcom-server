const express = require('express');
const router = express.Router();
const { getUser, createUser, login, logout } = require('./controllers');
const authMiddleware = require('./middlewares/auth');

router.get('/profile', authMiddleware, getUser);
router.post('/register', createUser);
router.post('/login', login);
router.post('/logout', authMiddleware, logout);
router.get('*', (req, res) => {
  // Update this to go to custom 404, if time allows
  res.status(404).send('Sorry, not found 😞');
});

module.exports = router;