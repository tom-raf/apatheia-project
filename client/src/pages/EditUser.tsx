import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/EditUser.css';
import Modal from '../components/Modal';
import { updateName, updateUsername, updatePassword, deleteUser } from '../services/userService';

function EditUser() {
  const navigate = useNavigate();
  const token: string | null= localStorage.getItem('token')!;

  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('');

    try {
      if (name) {
        const response = await updateName(name, token);
        console.log(response)
        if (!response.ok) {
          const result = await response.json(); /// This is where the console is pointing to for the user-editing issue
          throw new Error(result.message || 'Name update failed');
        }
        localStorage.setItem('name', name);
      }

      if (username) {
        const response = await updateUsername(username, token);
        if (!response.ok) {
          const result = await response.json();
          console.log('This is problem B')
          throw new Error(result.message || 'Username update failed');
        }
      }

      if (newPassword) {
        if (newPassword.length < 6) {
          setStatus('Password must be at least 6 characters long.');
          return;
        }

        if (!currentPassword) {
          setStatus('Please enter your current password to change it.');
          return;
        }

        const response = await updatePassword(currentPassword, newPassword, token);
        if (!response.ok) {
          const result = await response.json();
          console.log('This is problem C')
          throw new Error(result.message || 'Password update failed');
        }
      }

      setName('');
      setUsername('');
      setCurrentPassword('');
      setNewPassword('');
      setStatus('Changes saved successfully.');
    } catch (error) {
      console.error('Error saving changes:', error);
      setStatus(error.message || 'Failed to save changes.');
    }
  };

  const handleDelete = async () => {
    try {
      const response = await deleteUser(token);
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
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Current password"
          />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New password"
          />
          <div className="button-row">
            <button type="submit" className="save-button">Save</button>
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="delete-account-button"
            >
              Delete
            </button>
          </div>
        </form>
        {status && <p className="status-message">{status}</p>}
      </div>

      {showModal && (
        <Modal
          message="Are you sure you want to delete your account? This cannot be undone."
          confirmText="Yes"
          cancelText="No"
          onConfirm={handleDelete}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  );
}

export default EditUser;