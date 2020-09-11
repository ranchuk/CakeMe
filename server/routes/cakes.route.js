const express = require('express');
const router = express.Router();
const cakesController = require('../controllers/cakes.controller');
const auth = require('../middleware/auth');

router.get('/', auth, cakesController.getCakes);
router.get('/:id', auth, cakesController.getCake);
router.post('/', cakesController.addCake);
router.delete('/:id', cakesController.deleteCake);

module.exports = router; 