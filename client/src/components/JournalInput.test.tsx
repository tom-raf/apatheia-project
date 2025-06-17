import React from 'react';
import { render, screen, fireEvent, waitFor} from '@testing-library/react';
import { it, test, describe, expect, vi, beforeEach } from 'vitest';
import JournalInput from './JournalInput';
import * as journalService from '../services/journalService';

const testToken = 'diogenesTheFalse9'

beforeEach(() => {
  vi.stubGlobal('localStorage', {
    getItem: vi.fn(() => {testToken}),
    setItem: vi.fn()
  });
});

describe('Journal Input', () => {
  // Happy Path tests
  describe('Happy path', () => {
    it('loads existing journal entry on loading', async () => {
      const mockEntry = {
        journal_text: 'Today I practised free-kicks for 2 hours',
        id: 1,
        quote_id: 1,
        user_id: 'd9u5tiv94wfiw',
        date: '2025-06-17',
        createdAt: 'Tue Jun 17 2025 10:23:45 GMT+0100 (British Summer Time)',
        updatedAt: 'Tue Jun 17 2025 10:37:29 GMT+0100 (British Summer Time)',
        Quote: {
          quote_text: 'Football is a game of two halves',
          author: 'Diogenes'
        }
      }
      
      vi.spyOn(journalService, 'fetchTodayJournal').mockResolvedValue(mockEntry);
      vi.spyOn(journalService, 'createOrUpdateJournal').mockResolvedValue({ message: 'Your entry has been saved'})

      render(<JournalInput quoteId={1} />);

      await waitFor(() => {
        expect(screen.getByDisplayValue('Today I practised free-kicks for 2 hours')).toBeInTheDocument();
        expect(screen.getByText('Update Entry')).toBeInTheDocument();
      })
    })

    it('')

  })

  // Sad Path tests
  // describe('Sad path', () => {

  // })
})