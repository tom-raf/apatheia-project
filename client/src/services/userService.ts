const API_BASE = import.meta.env.VITE_API_BASE

export const updateName = async (name: string, token: string | null): Promise<Response> => {
  return fetch(`${API_BASE}/update-name`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });
};

export const updateUsername = async (username: string, token: string | null): Promise<Response> => {
  return fetch(`${API_BASE}/update-username`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ username }),
  });
};

export const updatePassword = async (currentPassword: string, newPassword: string, token: string | null): Promise<Response> => {
  return fetch(`${API_BASE}/update-password`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ currentPassword, newPassword }),
  });
};

export const deleteUser = async (token: string | null): Promise<Response> => {
  return fetch(`${API_BASE}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};