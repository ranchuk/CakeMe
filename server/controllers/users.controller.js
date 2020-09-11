const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const postSignup = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }

    const user = await User.findOne({ email });

    if (user) res.status(400).json({ msg: 'User already exists 😞' });

    const newUser = await new User({ email, password });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, async (err, hash) => {
        if (err) throw err;
        newUser.password = hash;

        const userRegistered = await newUser.save();

        jwt.sign({ id: userRegistered.id }, process.env.jwtSecret, { expiresIn: 3600 }, (err, token) => {
          if (err) throw err;

          res.status(200).json({
            token,
            user: {
              id: userRegistered.id,
              email: userRegistered.email
            }
          });
        });
      });
    });
  } catch (err) {
    res.status(500).json({ err });
  }
};

const postLogin = async (req, res) => {
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

const tokenIsValid = async (req, res) => {
  try {
    const token = req.header('x-auth-token');

    if (!token) res.json(false);

    const decoded = jwt.verify(token, process.env.jwtSecret);

    if (!decoded) res.json(false);

    const user = await User.findById(decoded.id);

    if (!user) res.json(false);

    return res.json(true);
  } catch (err) {
    return res.status(500).json({ error: err.msg });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    return res.json(user);

  } catch (err) {
    return res.status(400).json({ msg: '' });
  }
};

module.exports = { postSignup, postLogin, tokenIsValid, getUser };