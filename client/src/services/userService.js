const API_BASE = 'http://localhost:3000/api/users';

export const updateName = async (name, token) => {
  return fetch(`${API_BASE}/update-name`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });
};

export const updateUsername = async (username, token) => {
  return fetch(`${API_BASE}/update-username`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ username }),
  });
};

export const updatePassword = async (currentPassword, newPassword, token) => {
  return fetch(`${API_BASE}/update-password`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ currentPassword, newPassword }),
  });
};

export const deleteUser = async (token) => {
  return fetch(`${API_BASE}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};