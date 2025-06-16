type JournalEntry = {
  id: number;
  journal_text: string;
  user_id: string;
  quote_id: number;
  date: string;
  createdAt: string;
  updatedAt: string;
  Quote: {
    quote_text: string;
    author: string;
  };
};

type JournalCreate = {
  journal_text: string,
  quote_id: number;
}

type JournalUpdate = {
  journal_text: string,
  date: string
}

async function fetchWithToken<T>(token: string | null, path: string): Promise<T> {
  const response = await fetch(path, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(err || 'Fetch failed.');
  }

  return await response.json();
}

async function fetchTodayJournal(token: string | null): Promise<JournalEntry> {
  return fetchWithToken<JournalEntry>(token, 'http://localhost:3000/api/journal/today');
}

async function fetchJournalHistory(token: string | null): Promise<JournalEntry[]> {
  return fetchWithToken<JournalEntry[]>(token, 'http://localhost:3000/api/journal/history');
}

async function createOrUpdateJournal(input: string, existingEntry: boolean, quoteId: number, token: string | null): Promise<{message:string}> {
  const endpoint = existingEntry
    ? 'http://localhost:3000/api/journal/update'
    : 'http://localhost:3000/api/journal';

  const method = existingEntry ? 'PUT' : 'POST';

  const body: JournalUpdate | JournalCreate = existingEntry
    ? { journal_text: input, date: new Date().toISOString().split('T')[0] }
    : { journal_text: input, quote_id: quoteId }

  const response = await fetch(endpoint, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message || 'Save failed');
  return result;
};

export type { JournalEntry, JournalCreate, JournalUpdate}

export { fetchTodayJournal, fetchJournalHistory, createOrUpdateJournal}