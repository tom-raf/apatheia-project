import { useEffect, useState } from "react";
import './Home.css'
import Navbar from '../components/Navbar';

function Quote() {
  const [quote, setQuote] = useState(null);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/quote")
      .then((response) => response.json())
      .then((data) => setQuote(data))
      .catch(() => {
      });
  }, []);

  if (quote === null) {
    return <p>Loading...</p>; //Quote not always ready causing app to not load anything. Will look to handle better in a refactor.
  }

  const userName = 'Alastair';
  
  return (
    <div>
      <Navbar name={userName} />
      <div className="quote-container">
        <blockquote className="quote-text">"{quote.quote_text}"</blockquote>
        <p className="quote-author">— {quote.author}</p>
        <textarea
          className="quote-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write your thoughts..."
          />
      </div>
    </div>
  );
}

export default Quote;