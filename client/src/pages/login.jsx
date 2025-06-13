import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login-Register.css';
import { loginUser } from '../services/loginService';

function Login() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await loginUser(credentials);

      localStorage.setItem('token', result.token);
      localStorage.setItem('name', result.name);
      localStorage.setItem('id', result.id);
      localStorage.setItem('firstVisit', 'false');

      navigate('/home');
    } catch (error) {
      alert(error.message);
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
