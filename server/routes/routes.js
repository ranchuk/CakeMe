const express = require('express');
const router = express.Router();

const cakes = require('./cakes.route');
const users = require('./users.route');
const auth = require('./auth.route');

router.use('/cakes', cakes);
router.use('/users', users);
router.use('/auth', auth);

module.exports = router;