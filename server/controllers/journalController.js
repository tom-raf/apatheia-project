const JournalEntry = require('../models/journalEntryModel');
const Quote = require('../models/quoteModel');

exports.createJournalEntry = async (req, res) => {
  try {
    const { journal_text, quote_id } = req.body;
    const user_id = req.userId; // set by verifyToken middleware

    if (!journal_text || !quote_id) {
      return res.status(400).json({ message: 'Missing journal text or quote.' });
    }

    const entry = await JournalEntry.create({
      journal_text,
      quote_id,
      user_id
    });

    res.status(201).json({ message: 'Journal entry saved.', entry });
  } catch (error) {
    console.error('Error saving journal entry:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};