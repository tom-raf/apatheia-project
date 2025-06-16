type LoginCredentials = {
  username : string,
  password : string,
}

type LoginResponse = {
  message: string;
  token: string;
  name: string;
  id: string;
}

async function loginUser(credentials: LoginCredentials): Promise<LoginResponse> {
  const response = await fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  const result: LoginResponse = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Login failed.');
  }

  if (!result.token || !result.name || !result.id) {
    throw new Error('Unexpected server response.');
  }

  return result;
}

export type { LoginCredentials, LoginResponse };
export { loginUser };