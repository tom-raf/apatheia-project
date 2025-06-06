const express = require('express');
const router = express.Router();
const { createJournalEntry, getUserJournalHistory } = require('../controllers/journalController');
const verifyToken = require('../middleware/verifyToken');

router.post('/', verifyToken, createJournalEntry);
router.get('/history', verifyToken, getUserJournalHistory);

module.exports = router;