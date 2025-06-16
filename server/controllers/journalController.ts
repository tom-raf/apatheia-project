import { Request, Response } from 'express';
import JournalEntry from '../models/journalEntryModel';
import Quote from '../models/quoteModel';

// should probably put this in a types
interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const createJournalEntry = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { journal_text, quote_id } = req.body;
    const userId = req.userId;

    if (!journal_text || !quote_id || !userId) {
      res.status(400).json({ message: 'Missing journal text, quote, or user ID.' });
      return;
    }

    const today = new Date().toISOString().split('T')[0];

    const entry = await JournalEntry.create({
      journal_text,
      quote_id,
      user_id: userId,
      date: today,
    });

    res.status(201).json({ message: 'Journal entry saved.', entry });
  } catch (error) {
    console.error('Error saving journal entry:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

export const getUserJournalHistory = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(400).json({ message: 'Missing user ID.' });
      return;
    }

    const entries = await JournalEntry.findAll({
      where: { user_id: userId },
      include: {
        model: Quote,
        attributes: ['quote_text', 'author'],
      },
      order: [['createdAt', 'DESC']],
      limit: 10,
    });

    res.status(200).json(entries);
  } catch (error) {
    console.error('Error fetching journal history:', error);
    res.status(500).json({ message: 'Could not retrieve journal entries.' });
  }
};

export const updateJournalEntry = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { journal_text, date } = req.body;
    const userId = req.userId;

    if (!journal_text || !date || !userId) {
      res.status(400).json({ message: 'Missing updated journal text, date, or user ID.' });
      return;
    }

    const entry = await JournalEntry.findOne({
      where: {
        user_id: userId,
        date,
      },
    });

    if (!entry) {
      res.status(404).json({ message: 'Entry not found for this date.' });
      return;
    }

    entry.journal_text = journal_text;
    await entry.save();

    res.status(200).json({ message: 'Journal entry updated.', entry });
  } catch (error) {
    console.error('Error updating journal entry:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};


export const getTodaysEntry = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    const today = new Date().toISOString().split('T')[0];

    if (!userId) {
      res.status(400).json({ message: 'Missing user ID.' });
      return;
    }

    const entry = await JournalEntry.findOne({
      where: {
        user_id: userId,
        date: today,
      },
      include: {
        model: Quote,
        attributes: ['quote_text', 'author'],
      },
    });

    if (!entry) {
      res.status(404).json({ message: 'No entry found for today.' });
      return;
    }

    res.status(200).json(entry);
  } catch (error) {
    console.error("Error fetching today's entry:", error);
    res.status(500).json({ message: 'Server error.' });
  }
};
