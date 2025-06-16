import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/Navbar.css';

function Navbar() {
  const [name, setName] = useState<string>('');
  const [isFirstVisit, setIsFirstVisit] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setName(localStorage.getItem('name') || '');
    setIsFirstVisit(localStorage.getItem('firstVisit') === 'true');
  }, []);

  const greeting = isFirstVisit ? 'Chaire' : 'Welcome back';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('firstVisit');
    localStorage.removeItem('id');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/logo.png" alt="Logo" className="logo" />
        <span className="welcome">
          {greeting}, {name}
        </span>
      </div>
      <div className="navbar-right">
        <Link to="/home" className="nav-link">
          Home
        </Link>
        <Link to="/archive" className="nav-link">
          Archive
        </Link>
        <div
          className="profile-menu"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <span className="nav-link">Profile</span>
          {showDropdown && (
            <div className="dropdown">
              <Link to="/edit" className="dropdown-link">Edit</Link>
              <button onClick={handleLogout}>Log Out</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
