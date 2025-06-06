import { useEffect, useState } from "react";
import './Home.css'
import Navbar from '../components/Navbar';

function Home() {
  const [quote, setQuote] = useState(null);
  const [input, setInput] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/quote');
        const data = await response.json();
        setQuote(data);
      } catch (error) {
        console.error('Error fetching quote:', error);
      }
    };

    fetchQuote();
  }, []);

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
          quote_id: quote.id
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
    <>
      <Navbar />

      <div className="home-container">
        {quote && (
          <div className="quote-section">
            <p className="quote-text">"{quote.quote_text}"</p>
            <p className="quote-author">— {quote.author}</p>
          </div>
        )}

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
      </div>
    </>
  );
}

export default Home;