export async function fetchTodayJournal(token) {
  const response = await fetch('http://localhost:3000/api/journal/today', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error('No journal found for today.');
  return await response.json();
};

export async function saveOrUpdateJournal({ input, existingEntry, quoteId, token }) {
  const endpoint = existingEntry
    ? 'http://localhost:3000/api/journal/update'
    : 'http://localhost:3000/api/journal';
  const method = existingEntry ? 'PUT' : 'POST';

  const body = JSON.stringify({
    journal_text: input,
    ...(existingEntry
      ? { date: new Date().toISOString().split('T')[0] }
      : { quote_id: quoteId }),
  });

  const response = await fetch(endpoint, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body,
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message || 'Save failed');
  return result;
};