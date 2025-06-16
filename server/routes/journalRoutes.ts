import { Router } from 'express';
import {
  createJournalEntry,
  getUserJournalHistory,
  updateJournalEntry,
  getTodaysEntry,
} from '../controllers/journalController';
import { verifyToken } from '../middleware/verifyToken';

const router = Router();

router.post('/', verifyToken, createJournalEntry);
router.get('/history', verifyToken, getUserJournalHistory);
router.put('/update', verifyToken, updateJournalEntry);
router.get('/today', verifyToken, getTodaysEntry);

export default router;
