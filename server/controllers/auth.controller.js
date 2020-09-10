const UserSchema = require('../models/user.model');
const jwt = require('jsonwebtoken');

const createToken = (id) => {
  return jwt.sign({ id }, 'cakes secret', {
    expiresIn: 36000
  });
};

const handleErrors = (err) => {
  let errors = { email: '', password: '' };

  if (err.message === 'Inncorrect Email 🧐') {
    errors.email = 'That email is not registered!';
  }

  if (err.message === 'Inncorrect Password 🧐') {
    errors.password = 'That password is not incorrect! 🤭';
  }


  if (err.code === 11000) {
    errors.email = 'That email is already registered! 🤭';
    return errors;
  }

  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const getSignup = async (req, res) => {
  res.send('signup');
};

const getLogin = async (req, res) => {
  res.send('login');
};

const postSignup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserSchema.create({ email, password });

    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: 3600 * 1000 });

    res.status(201).json({
      success: true,
      data: user._id
    });
  } catch (err) {
    const errors = handleErrors(err);

    res.status(400).json({ errors });
  }
};

const postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserSchema.login(email, password);

    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: 3600 * 1000 });

    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);

    res.status(400).json({ errors });
  }
};

module.exports = { getSignup, getLogin, postSignup, postLogin };