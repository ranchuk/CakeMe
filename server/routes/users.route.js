const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const auth = require('../middleware/auth');

router.post('/signup', usersController.postSignup);
router.post('/login', usersController.postLogin);
router.post('/tokenIsValid', usersController.tokenIsValid);
router.get('/', auth, usersController.getUser);

module.exports = router; 