import { useEffect, useState } from 'react';
import { fetchTodayJournal, saveOrUpdateJournal } from '../services/journalService';
import '../styles/JournalInput.css';

function JournalInput({ quoteId }) {
  const [input, setInput] = useState('');
  const [existingEntry, setExistingEntry] = useState(false);
  const [status, setStatus] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const getTodayEntry = async () => {
      try {
        const data = await fetchTodayJournal(token);
        setInput(data.journal_text);
        setExistingEntry(true);
      } catch {
        console.log('No journal found for today (yet).');
      }
    };

    getTodayEntry();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');

    try {
      const result = await saveOrUpdateJournal({ input, existingEntry, quoteId, token });
      setStatus(result.message || 'Entry saved.');
      setExistingEntry(true);
    } catch (error) {
      console.error('Failed to save journal:', error);
      setStatus('Failed to save entry.');
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