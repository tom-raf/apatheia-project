import './App.css'
import { useEffect, useState } from 'react'

function App() {
  const [quote, setQuote] = useState(null);

  useEffect( () => {
    fetch("http://localhost:3000/api/quote")
      .then((response) => response.json())
      .then((data) => setQuote(data))
  }, []);

  return (
    <>
      <h1>Apatheia</h1>
      <p>{quote.quote_text}</p>
      <p>— {quote.author}</p>
    </>
  )
}

export default App
