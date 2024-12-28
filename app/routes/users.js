const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/validate', authMiddleware, userController.validateUser);


module.exports = router;