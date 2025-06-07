import './QuoteCard.css';

function QuoteCard({ quoteText, author }) {
  return (
    <div className="quote-section">
      <p className="quote-text">"{quoteText}"</p>
      <p className="quote-author">— {author}</p>
    </div>
  );
}

export default QuoteCard;
