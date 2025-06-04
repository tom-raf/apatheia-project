const express = require('express');
const router = express.Router();
const {getAQuote} = require('../controllers/quotesController');

router.get('/', getAQuote);

module.exports = router;