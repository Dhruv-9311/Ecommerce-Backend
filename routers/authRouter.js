const express = require('express');
const authController = require('../controllers/authController');
const authRouter = express.Router();

// Auth routes
authRouter.post('/signup', authController.signup);
authRouter.post('/login', authController.login);

module.exports = authRouter;
