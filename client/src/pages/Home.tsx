import { useEffect, useState } from 'react';
import '../styles/Home.css';
import Navbar from '../components/Navbar';
import QuoteCard from '../components/QuoteCard';
import JournalInput from '../components/JournalInput';
import { fetchDailyQuote } from '../services/quoteService';
import type { Quote } from '../services/quoteService';

function Home() {
  const [quote, setQuote] = useState<Quote | null>(null);

  useEffect(() => {
    const getQuote = async () => {
      try {
        const data: Quote = await fetchDailyQuote();
        setQuote(data);
      } catch (error) {
        console.error('Error fetching quote in Home:', error);
      }
    };

    getQuote();
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
