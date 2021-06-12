const jwt = require('jsonwebtoken');
const User = require('../models/users');
const redisClient = require('../models/redis');
const SECRET_KEY = process.env.SECRET_KEY;

const authMiddleware = async (req, res, next) => {
  const authHeaders = req.headers.authorization;
  if (!authHeaders) return res.sendStatus(403);
  const token = authHeaders.split(' ')[1];

  redisClient.get(`blacklist_${token}`, (err, data) => {
    if (err) return res.status(400).send({ err, message: 'An error occurred, logging out.' });
    if (data) return res.send({ message: 'Please login again.' });
  });
  try {
    const { id, exp } = jwt.verify(token, SECRET_KEY);
    const user = await User.findOne({ where: { id: id } });
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
