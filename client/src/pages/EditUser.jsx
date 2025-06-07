import Navbar from '../components/Navbar';
import './EditUser.css';

function EditUser() {
  return (
    <>
      <Navbar />
      <div className="edit-user-container">
        <h2>Edit User</h2>
        <p>This page will allow users to update their account information.</p>
      </div>
    </>
  );
}

export default EditUser;
