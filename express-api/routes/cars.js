const express = require('express');
const router = express.Router();
const CarController = require('../controllers/car');
const authMiddleware = require('../middlewares/auth');

router.get('/', [authMiddleware.auth], CarController.index);
router.get('/:id', [authMiddleware.auth], CarController.show);
router.post('/', [authMiddleware.auth], CarController.store);
router.put('/:id', [authMiddleware.auth], CarController.update);
router.delete('/:id', [authMiddleware.auth], CarController.delete);
router.patch('/:id/position', [authMiddleware.auth], CarController.setPosition);

module.exports = router;
