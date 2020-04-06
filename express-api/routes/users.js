const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const authMiddleware = require('../middlewares/auth');
const adminMiddleware = require('../middlewares/admin');

router.get('/', [authMiddleware.auth, adminMiddleware.admin], UserController.index);
router.get('/:id', [authMiddleware.auth], UserController.show);
router.post('/', [authMiddleware.auth, adminMiddleware.admin], UserController.store);
router.put('/:id', [authMiddleware.auth], UserController.update);
router.delete('/:id', [authMiddleware.auth, adminMiddleware.admin], UserController.delete);

module.exports = router;
