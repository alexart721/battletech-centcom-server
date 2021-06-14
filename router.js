const express = require('express');
const router = express.Router();
const {
  getUser, createUser, login, logout, updateUser,
  getCampaign, getCampaigns, createCampaign, updateCampaign
} = require('./controllers');
const authMiddleware = require('./middlewares/auth');

router.get('/profile', authMiddleware, getUser);
router.post('/register', createUser);
router.post('/login', login);
router.post('/logout', authMiddleware, logout);
router.put('/updateuser', authMiddleware, updateUser);
router.get('/campaigns', authMiddleware, getCampaigns);
router.get('/campaigns/:id', authMiddleware, getCampaign);
router.post('/campaigns', authMiddleware, createCampaign);
router.put('/campaigns/:id', authMiddleware, updateCampaign);
router.get('*', (req, res) => {
  // Update this to go to custom 404, if time allows
  res.status(404).send('Sorry, not found 😞');
});

module.exports = router;