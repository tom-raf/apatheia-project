type RegisterCredentials = {
  name: string,
  username: string,
  password: string
}

type RegisterResponse = {
  message: string;
  token: string;
  name: string;
  id: string;
}

async function registerUser(formData: RegisterCredentials): Promise<RegisterResponse> {
  const response = await fetch('http://localhost:3000/api/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
});

  const result: RegisterResponse = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Registration failed.');
  }

  if (!result.token || !result.name || !result.id) {
    throw new Error('Unexpected server response.');
  }

  return result;
}

export type { RegisterCredentials, RegisterResponse}
export { registerUser }