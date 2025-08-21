const express = require('express');
const exchangeController = require('../controllers/exchangeContoller');

const exchangeRouter = express.Router();

exchangeRouter.post('/convert', exchangeController.convertCurrency);

module.exports = exchangeRouter;
