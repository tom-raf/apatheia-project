import { useState } from 'react';
import './JournalInput.css';

function JournalInput({ quoteId }) {
  const [input, setInput] = useState('');
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/journal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          journal_text: input,
          quote_id: quoteId
        })
      });

      const result = await response.json();
      console.log(result.message);
      setInput('');
    } catch (error) {
      console.error('Failed to save journal:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="journal-form">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Write your thoughts here..."
        className="journal-input"
        rows={6}
      />
      <button type="submit" className="submit-button">Save Entry</button>
    </form>
  );
}

export default JournalInput;