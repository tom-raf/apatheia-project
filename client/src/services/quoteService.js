export async function fetchDailyQuote() {
  try {
    const response = await fetch('http://localhost:3000/api/quote');
    if (!response.ok) {
      throw new Error(`Failed to fetch quote: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in fetchDailyQuote:', error);
    throw error;
  }
};