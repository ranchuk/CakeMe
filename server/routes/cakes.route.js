const express = require('express');
const router = express.Router();
const cakesController = require('../controllers/cakes.controller');

router.get('/', cakesController.getCakes);

router.delete('/:id', cakesController.deleteCake);

module.exports = router; 