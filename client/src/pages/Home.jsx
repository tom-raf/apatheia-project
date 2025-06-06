import { useEffect, useState } from "react";
import './Home.css';
import Navbar from '../components/Navbar';
import QuoteCard from '../components/QuoteCard';
import JournalInput from '../components/JournalInput';

function Home() {
  const [quote, setQuote] = useState(null);

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

  return (
    <>
      <Navbar />
      <div className="home-container">
        {quote && (
          <>
            <QuoteCard quoteText={quote.quote_text} author={quote.author} />
            <JournalInput quoteId={quote.id} />
          </>
        )}
      </div>
    </>
  );
}

export default Home;