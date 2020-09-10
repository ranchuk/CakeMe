const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  try {
    if (token) {
      jwt.verify(token, 'cakes secret', (err, decodedToken) => {
        if (err) {
          res.redirect('/login');
        } else {
          next();
        }
      });
    } else {
      res.redirect('/login');
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { requireAuth };