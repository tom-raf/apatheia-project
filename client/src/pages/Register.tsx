import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login-Register.css';
import type { RegisterCredentials, RegisterResponse } from '../services/registerService';
import { registerUser } from '../services/registerService';
import Modal from '../components/Modal';

function Register() {

  const [formData, setFormData] = useState<RegisterCredentials>({
    name: '',
    username: '',
    password: '',
  });
  
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }

    try {
      const result: RegisterResponse = await registerUser(formData);

      localStorage.setItem('token', result.token);
      localStorage.setItem('name', result.name);
      localStorage.setItem('id', result.id);
      localStorage.setItem('firstVisit', 'true');

      setShowSuccessModal(true);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleContinue = () => {
    setShowSuccessModal(false);
    navigate('/home');
  };

  return (
    <div className="page-wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
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
        <Modal
          message="Registration successful."
          confirmText="Continue"
          onConfirm={handleContinue}
        />
      )}
    </div>
  );
}

export default Register;
