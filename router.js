const express = require('express');
const router = express.Router();
const {
  getUser, createUser, login, logout, updateUser,
  getCampaign, getAllCampaigns, getCurrentCampaigns, getPastCampaigns,
  createCampaign, updateCampaign, createMech, getAllMechs, assignMech
} = require('./controllers');
const authMiddleware = require('./middlewares/auth');

router.get('/profile', authMiddleware, getUser);
router.post('/register', createUser);
router.post('/login', login);
router.post('/logout', authMiddleware, logout);
router.put('/updateuser', authMiddleware, updateUser);
router.get('/campaigns', authMiddleware, getAllCampaigns);
router.get('/campaigns/current', authMiddleware, getCurrentCampaigns);
router.get('/campaigns/past', authMiddleware, getPastCampaigns);
router.get('/campaigns/:id', authMiddleware, getCampaign);
router.post('/campaigns', authMiddleware, createCampaign);
router.put('/campaigns/:id', authMiddleware, updateCampaign);
router.post('/mechs', authMiddleware, createMech);
router.get('/mechs', authMiddleware, getAllMechs);
router.post('/mechs/assign/:id', authMiddleware, assignMech);
router.get('*', (req, res) => {
  // Update this to go to custom 404, if time allows
  res.status(404).send('Sorry, not found 😞');
});

module.exports = router;