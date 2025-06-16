import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login-Register.css';
import type { LoginCredentials, LoginResponse } from '../services/loginService';
import { loginUser } from '../services/loginService';

function Login() {

  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: '',
    password: '',
  });
  
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result: LoginResponse = await loginUser(credentials);

      localStorage.setItem('token', result.token);
      localStorage.setItem('name', result.name);
      localStorage.setItem('id', result.id);
      localStorage.setItem('firstVisit', 'false');

      navigate('/home');
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('An unknown error occurred');
      }
    }
  };

  return (
    <div className="page-wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
