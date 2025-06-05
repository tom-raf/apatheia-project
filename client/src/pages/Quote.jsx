import { useEffect, useState } from "react";

function Quote() {
  const [quote, setQuote] = useState(null);

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

  return (
    <div>
      <h1>Today's Stoic Quote</h1>
      <p>{quote.quote_text}</p>
      <p>— {quote.author}</p>
    </div>
  );
}

export default Quote;