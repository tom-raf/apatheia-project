import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages/Login-Register.css';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || 'Registration failed.');

      alert(result.message);
      localStorage.setItem('token', result.token);
      localStorage.setItem('name', result.name); // Set the name
      localStorage.setItem('firstVisit', 'true'); // Mark it as first-time login

      navigate('/home');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="page-wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          placeholder="Your Name"
          required
        />
        <input
          type="text"
          name="username"
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
