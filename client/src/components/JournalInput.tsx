import React from 'react';
import { useEffect, useState } from 'react';
import type { JournalEntry } from '../services/journalService';
import { fetchTodayJournal, createOrUpdateJournal } from '../services/journalService';
import '../styles/JournalInput.css';

type JournalInputProps = {
  quoteId: number
}

function JournalInput({ quoteId }: JournalInputProps) {
  const [input, setInput] = useState<string>('');
  const [existingEntry, setExistingEntry] = useState<boolean>(false);
  const [status, setStatus] = useState<string>('');
  const token: string | null = localStorage.getItem('token');

  useEffect(() => {
    
    const getTodayEntry = async () => {
      try {
        const data: JournalEntry = await fetchTodayJournal(token);
        setInput(data.journal_text);
        setExistingEntry(true);
      } catch {
        console.log('No journal found for today (yet).');
      }
    };

    getTodayEntry();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    
    e.preventDefault();
    setStatus('');

    try {
      const result: {message:string} = await createOrUpdateJournal(input, existingEntry, quoteId, token);
      setStatus(result.message || 'Entry saved.');
      setExistingEntry(true);
    } catch (error) {
      console.error('Failed to save journal:', error);
      setStatus(existingEntry ? 'Failed to update entry.' : 'Failed to save entry.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="journal-form">
      <textarea
        className="journal-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Write your thoughts here..."
        rows={13}
      />
      <button type="submit" className="submit-button">
        {existingEntry ? 'Update Entry' : 'Save Entry'}
      </button>
      {status && <p className="status-message">{status}</p>}
    </form>
  );
}

export default JournalInput;