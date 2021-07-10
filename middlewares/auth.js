import { verify } from 'jsonwebtoken';
import User from '../models/users';

const { SECRET_KEY } = process.env;

const authMiddleware = async (req, res, next) => {
  const authHeaders = req.headers.authorization;
  if (!authHeaders) return res.sendStatus(403);
  const token = authHeaders.split(' ')[1];

  req.app.locals.redisClient.get(`blacklist_${token}`, (err, data) => {
    if (err) return res.status(400).send({ err, message: 'An error occurred, logging out.' });
    if (data) return res.send({ message: 'Please login again.' });
  });
  try {
    const { id, exp } = verify(token, SECRET_KEY);
    const user = await User.findOne({ where: { id } });
    if (!user) return res.sendStatus(401);
    req.user = user;
    req.tokenExp = exp;
    req.token = token;
    next();
  } catch (error) {
    res.sendStatus(401);
  }
};

export default authMiddleware;
