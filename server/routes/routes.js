const express = require('express');
const router = express.Router();
const cakes = require('./cakes.route');

router.use('/cakes', cakes);

module.exports = router;