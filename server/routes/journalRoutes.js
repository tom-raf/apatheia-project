const express = require('express');
const router = express.Router();
const { createJournalEntry, getUserJournalHistory, updateJournalEntry, getTodaysEntry } = require('../controllers/journalController');
const verifyToken = require('../middleware/verifyToken');

router.post('/', verifyToken, createJournalEntry);
router.get('/history', verifyToken, getUserJournalHistory);
router.put('/update', verifyToken, updateJournalEntry);
router.get('/today', verifyToken, getTodaysEntry);

module.exports = router;