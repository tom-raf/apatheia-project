type Quote = {
  id: number,
  quote_text: string,
  author: string,
  assigned_date: Date,
}

async function fetchDailyQuote(): Promise<Quote> {
  try {
    const response = await fetch('http://localhost:3000/api/quote');
    console.log(response);
    if (!response.ok) {
      throw new Error(`Failed to fetch quote: ${response.status}`);
    }
    const data: Quote = await response.json();
    return data;
  } catch (error) {
    console.error('Error in fetchDailyQuote:', error);
    throw error;
  }
};

export type { Quote }

export { fetchDailyQuote }