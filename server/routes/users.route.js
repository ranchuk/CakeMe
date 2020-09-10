const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/signup', authController.postSignup);
router.post('/login', authController.postLogin);
router.get('/signup', authController.getSignup);
router.get('/login', authController.getLogin);

module.exports = router; 