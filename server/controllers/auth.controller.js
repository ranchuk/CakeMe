const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const postAuth = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }

    const user = await User.findOne({ email });

    if (!user) res.status(400).json({ msg: 'User Does Not Exist 😞' });

    const hashed = await bcrypt.compare(password, user.password);

    if (!hashed) res.status(400).json({ msg: 'Invalid Credentials 😅' });

    jwt.sign({ id: user.id }, process.env.jwtSecret, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;

      res.status(200).json({
        token,
        user: {
          id: user.id,
          email: user.email
        }
      });
    });

  } catch (err) {
    return res.status(400).json({ err });
  }
};

module.exports = { postAuth };