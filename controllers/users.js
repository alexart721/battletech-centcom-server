const User = require('../models/users');

const getUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    res.status(200);
    res.send(user);
  } catch (err) {
    res.status(500);
    res.send(err);
  }
}

module.exports = {
  getUser
}