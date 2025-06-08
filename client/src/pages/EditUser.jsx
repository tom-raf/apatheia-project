import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './EditUser.css';

function EditUser() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  const handleSave = async (e) => {
    e.preventDefault();
    setStatus('');

    try {
      if (name) {
        await fetch('http://localhost:3000/api/users/update-name', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name }),
        });
        localStorage.setItem('name', name);
      }

      if (username) {
        const usernameResponse = await fetch('http://localhost:3000/api/users/update-username', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ username }),
        });

        if (!usernameResponse.ok) {
          const result = await usernameResponse.json();
          throw new Error(result.message || 'Username update failed');
        }
      }

      if (password) {
        await fetch('http://localhost:3000/api/users/update-password', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ password }),
        });
      }

      setStatus('Changes saved successfully.');
    } catch (error) {
      console.error('Error saving changes:', error);
      setStatus(error.message || 'Failed to save changes.');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This cannot be undone.')) return;

    try {
      const response = await fetch('http://localhost:3000/api/users', {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        localStorage.clear();
        navigate('/');
      } else {
        console.error('Failed to delete account');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="edit-user-container">
        <h2>Edit User</h2>
        <form onSubmit={handleSave} className="edit-form">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Update name"
          />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Update username"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Update password"
          />
          <div className="button-row">
            <button type="submit" className="save-button">Save</button>
            <button type="button" onClick={handleDelete} className="delete-account-button">Delete</button>
          </div>
        </form>
        {status && <p className="status-message">{status}</p>}
      </div>
    </>
  );
}

export default EditUser;