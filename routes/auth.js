const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/signup', (req, res) => res.render('user/signup'));
router.post('/signup', authController.signup);
router.get('/login', (req, res) => res.render('user/login'));
router.post('/login', authController.login);
router.get('/logout', authController.logout);

module.exports = router;
