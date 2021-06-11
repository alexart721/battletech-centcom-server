const User = require('../models/users');
const path = require('path'); // Comment out for Heroku commits
require('dotenv').config({ path: path.join(__dirname, '..', '/.env') }); // Comment out for Heroku commits
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const getUser = async (req, res) => {
  try {
    console.log('In controller, getUser', req.user);
    const { email } = req.user;
    const { firstName, lastName } = await User.findOne({ where: { email: email } });
    const user = { firstName, lastName, email };
    res.status(200);
    res.send(user);
  } catch (err) {
    res.status(500);
    res.send(err);
  }
}

const createUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email: email } });
  if (user) {
    return res.status(409).send({
      error: '409',
      message: 'User already exists'
    });
  }
  try {
    if (password === '') throw new Error();
    const hashPassword = await bcrypt.hash(password, 10);
    const { id } = await User.create({
      ...req.body,
      password: hashPassword
    });
    const accessToken = jwt.sign({ id }, SECRET_KEY);
    res.status(201).send({ accessToken });
  } catch (err) {
    res.status(400).send({ err, message: 'Could not create user' });
  }
}

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email: email } });
    console.log('In controller, login', user);
    const validatedPass = await bcrypt.compare(password, user.password);
    if (!validatedPass) throw new Error();
    const accessToken = jwt.sign({ id: user.id }, SECRET_KEY);
    res.status(200).send({ accessToken });
  } catch (error) {
    res
      .status(401)
      .send({ error: '401', message: 'Username or password is incorrect' });
  }
}

module.exports = {
  getUser,
  createUser,
  login
}