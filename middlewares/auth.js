const jwt = require('jsonwebtoken');
const User = require('../models/users');
// const path = require('path'); // Comment out for Heroku commits
// require('dotenv').config({ path: path.join(__dirname, '..', '/.env') }); // Comment out for Heroku commits
const redisClient = require('../models/redis');
const SECRET_KEY = process.env.SECRET_KEY;

const authMiddleware = async (req, res, next) => {
  const authHeaders = req.headers.authorization;
  if (!authHeaders) return res.sendStatus(403);
  const token = authHeaders.split(' ')[1];

  await redisClient.get(`blacklist_${token}`, (err, data) => {
    console.log('In auth Redis');
    if (err) return res.status(400).send({ err, message: 'An error occurred, logging out.' });
    if (data) return res.send({ message: 'Please login again.' });
  });
  try {
    const { id, exp } = jwt.verify(token, SECRET_KEY);
    const verify = jwt.verify(token, SECRET_KEY);
    const decode = jwt.decode(token, SECRET_KEY);
    console.log('In auth, verify', verify);
    console.log('In auth, decode', decode);
    const user = await User.findOne({ where: { id: id } });
    console.log('In auth, user', user);
    if (!user) return res.sendStatus(401);
    req.user = user;
    req.tokenExp = exp;
    req.token = token;
    next();
  } catch (error) {
    res.sendStatus(401);
  }
};

module.exports = authMiddleware;
