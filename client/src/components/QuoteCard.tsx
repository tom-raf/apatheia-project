import '../styles/QuoteCard.css';

type QuoteCardProps = {
  quoteText: string,
  author: string
}

function QuoteCard({ quoteText, author }: QuoteCardProps) {
  return (
    <div className="quote-section">
      <p className="quote-text">"{quoteText}"</p>
      <p className="quote-author">— {author}</p>
    </div>
  );
}

export default QuoteCard;
