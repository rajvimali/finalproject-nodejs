const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/verify-email', userController.verifyEmail);

router.get('/products', userController.getProducts);

module.exports = router;
