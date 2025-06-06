const express = require('express');
const router = express.Router();
const { createJournalEntry } = require('../controllers/journalController');
const verifyToken = require('../middleware/verifyToken');

router.post('/', verifyToken, createJournalEntry);

module.exports = router;