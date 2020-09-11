const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const token = req.header('x-auth-token');

    if (!token) res.status(401).json({ msg: 'No Token Authrization Denied 😢' });

    const decoded = jwt.verify(token, process.env.jwtSecret);

    req.user = decoded;

    next();
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: 'Token Is Not Valid 🤨' });
  }
};

module.exports = auth;