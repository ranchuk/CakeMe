const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/authMiddleware');
const cakesController = require('../controllers/cakes.controller');

router.get('/', requireAuth, cakesController.getCakes);
router.get('/:id', cakesController.getCake);
router.post('/', cakesController.addCake);
router.delete('/:id', cakesController.deleteCake);

module.exports = router; 