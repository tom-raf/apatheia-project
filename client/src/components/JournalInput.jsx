import { useEffect, useState } from 'react';
import '../styles/JournalInput.css';

function JournalInput({ quoteId }) {
  const [input, setInput] = useState('');
  const [existingEntry, setExistingEntry] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchTodayEntry = async () => {
      try {
        const response = await fetch(
          'http://localhost:3000/api/journal/today',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.ok) {
          const data = await response.json();
          setInput(data.journal_text);
          setExistingEntry(true);
        }
      } catch (error) {
        console.log('No journal found for today (yet).');
      }
    };

    fetchTodayEntry();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = existingEntry
      ? 'http://localhost:3000/api/journal/update'
      : 'http://localhost:3000/api/journal';
    const method = existingEntry ? 'PUT' : 'POST';

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          journal_text: input,
          ...(existingEntry
            ? { date: new Date().toISOString().split('T')[0] }
            : { quote_id: quoteId }),
        }),
      });

      const result = await response.json();
      console.log(result.message);
      setExistingEntry(true);
    } catch (error) {
      console.error('Failed to save journal:', error);
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
    </form>
  );
}

export default JournalInput;
