const express = require('express');
const router = express.Router();
const cakes = require('./cakes.route');
const users = require('./users.route');

router.use('/cakes', cakes);
router.use('/', users);

module.exports = router;