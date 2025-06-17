import React from 'react';
import { render, screen, fireEvent, waitFor} from '@testing-library/react';
import { test, describe, expect, vi, beforeEach } from 'vitest';
import JournalInput from './JournalInput';
import * as journalService from '../services/journalService';

const testToken = 'diogenesTheFalse9'

beforeEach(() => {
  vi.stubGlobal('localStorage', {
    getItem: vi.fn(() => {return testToken}),
    setItem: vi.fn()
  });
});

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

describe('Journal Input', () => {
  // Happy Path tests
  describe('Happy path', () => {
    test('should load existing journal entry on loading', async () => {
      vi.spyOn(journalService, 'fetchTodayJournal').mockResolvedValue(mockEntry);
      vi.spyOn(journalService, 'createOrUpdateJournal').mockResolvedValue({ message: 'Your entry has been saved'})

      render(<JournalInput quoteId={1} />);

      await waitFor(() => {
        expect(screen.getByDisplayValue('Today I practised free-kicks for 2 hours')).toBeInTheDocument();
        expect(screen.getByText('Update Entry')).toBeInTheDocument();
      })
    })

    test('should let the user write a new entry and save it', async () => {
      vi.spyOn(journalService, 'fetchTodayJournal').mockRejectedValue(new Error('Sorry, this entry does not exist'));
      const saveMock = vi.spyOn(journalService, 'createOrUpdateJournal').mockResolvedValue({message: 'Your entry has been saved'});

      render(<JournalInput quoteId={2} />);

      const textArea = screen.getByPlaceholderText('Write your thoughts here...');
      fireEvent.change(textArea, { target: { value: 'Bend it like Socrates'}});
      fireEvent.click(screen.getByText('Save Entry'));

      await waitFor(() => {
        expect(saveMock).toHaveBeenCalledWith('Bend it like Socrates', false, 2, testToken);
        expect(screen.getByText('Your entry has been saved')).toBeInTheDocument()
      });
    });

    test('should let the user update an existing entry and save it', async () => {
      vi.spyOn(journalService, 'fetchTodayJournal').mockResolvedValue(mockEntry)
      const saveMock = vi.spyOn(journalService, 'createOrUpdateJournal').mockResolvedValue({ message: 'Journal entry updated' });

      render(<JournalInput quoteId={3} />);

      await waitFor(() => {
        expect(screen.getByDisplayValue('Today I practised free-kicks for 2 hours')).toBeInTheDocument();
        expect(screen.getByText('Update Entry')).toBeInTheDocument();
      });

      const textArea = screen.getByPlaceholderText('Write your thoughts here...');
      fireEvent.change(textArea, { target: { value: 'I think, therefore I play football'}});
      fireEvent.click(screen.getByText('Update Entry'));

      await waitFor(() => {
        expect(saveMock).toHaveBeenCalledWith('I think, therefore I play football', true, 3, testToken);
        expect(screen.getByText('Journal entry updated')).toBeInTheDocument()
      });
    });
  })

  // Sad Path tests
  describe('Sad path', () => {
    test('should handle failures when trying to save a new journal entry', async () => {
      vi.spyOn(journalService, 'fetchTodayJournal').mockRejectedValue(new Error('Sorry, this entry does not exist'));
      vi.spyOn(journalService, 'createOrUpdateJournal').mockRejectedValue(new Error (`Sorry, there's a problem`));

      render(<JournalInput quoteId={4} />);

      const textArea = screen.getByPlaceholderText('Write your thoughts here...');
      fireEvent.change(textArea, { target: { value: `Welcome to Plato's Cave - showing Champion's League football every night`}});
      fireEvent.click(screen.getByText('Save Entry'));

      await waitFor(() => {
        expect(screen.getByText('Failed to save entry.')).toBeInTheDocument()
      });
    })

    test('should handle failures when trying to save an existing journal entry', async () => {
      vi.spyOn(journalService, 'fetchTodayJournal').mockResolvedValue(mockEntry);
      vi.spyOn(journalService, 'createOrUpdateJournal').mockRejectedValue(new Error (`Sorry, there's a problem`));

      render(<JournalInput quoteId={5} />);

      await waitFor(() => {
        expect(screen.getByDisplayValue(`Today I practised free-kicks for 2 hours`)).toBeInTheDocument();
        expect(screen.getByText('Update Entry')).toBeInTheDocument();
      });

      const textArea = screen.getByPlaceholderText('Write your thoughts here...');
      fireEvent.change(textArea, { target: { value: `Then I sat down and wrote a treatise on existentialism in football`}});
      fireEvent.click(screen.getByText('Update Entry'));

      await waitFor(() => {
        expect(screen.getByText('Failed to update entry.')).toBeInTheDocument()
      })

    })
  })
})