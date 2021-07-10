import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../models/users';

const { SECRET_KEY } = process.env;

export const getUser = async (req, res) => {
  try {
    const { email } = req.user;
    const { firstName, lastName } = await User.findOne({ where: { email } });
    const user = { firstName, lastName, email };
    res.status(200);
    res.send(user);
  } catch (error) {
    res.status(500);
    res.send({ error, message: 'Could not get user.' });
  }
};

export const createUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (user) {
    return res.status(409).send({
      error: '409',
      message: 'User already exists',
    });
  }
  try {
    if (password === '') throw new Error();
    const hashPassword = await bcrypt.hash(password, 10);
    const { id } = await User.create({
      ...req.body,
      password: hashPassword,
    });
    const accessToken = jwt.sign({ id }, SECRET_KEY, { expiresIn: '3h' });
    res.status(201).send({ accessToken });
  } catch (error) {
    res.status(400).send({ error, message: 'Could not create user' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findOne({ where: { id } });
    const {
      firstName, lastName, email, password,
    } = req.body;
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    if (password !== '') {
      const hashPassword = await bcrypt.hash(password, 10);
      user.password = hashPassword;
    }
    await user.save();
    res.status(200);
    res.send(user);
  } catch (error) {
    res.status(500);
    res.send({ error, message: 'Could not update user.' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    const validatedPass = await bcrypt.compare(password, user.password);
    if (!validatedPass) throw new Error();
    const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '3h' });
    res.status(200).send({ accessToken });
  } catch (err) {
    res.status(401).send({ error: '401', message: 'Username or password is incorrect' });
  }
};

export const logout = async (req, res) => {
  const { token, tokenExp } = req;
  try {
    // JWT expire time is in seconds to expire time since Epoch
    // Redis setex takes expire time in seconds
    // Need to set by taking difference from now to exp in seconds
    const timeToExpire = tokenExp - Math.floor(Date.now() / 1000);
    req.app.locals.redisClient.setex(`blacklist_${token}`, timeToExpire, true);
    res.status(200).send({ message: 'Logout successful!' });
  } catch (error) {
    res.status(400).send({ error, message: 'System error, logging out.' });
  }
};
