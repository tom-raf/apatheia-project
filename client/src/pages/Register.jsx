import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login-Register.css';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Registration failed.');

      localStorage.setItem('token', result.token);
      localStorage.setItem('name', result.name);
      localStorage.setItem('id', result.id);
      localStorage.setItem('firstVisit', 'true');

      setShowSuccessModal(true);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="page-wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>

        {error && <p className="status-message">{error}</p>}

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
        />
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Register</button>
      </form>

      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Registration Successful</h2>
            <p>Your account has been created.</p>
            <div className="modal-buttons">
              <button
                className="confirm-button"
                onClick={() => navigate('/home')}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
