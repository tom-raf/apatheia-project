import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const name = localStorage.getItem('name');
  const isFirstVisit = localStorage.getItem('firstVisit') === 'true';

  const greeting = isFirstVisit ? 'Chaire' : 'Welcome back';

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/logo.png" alt="Logo" className="logo" />
        <span className="welcome">{greeting}, {name}</span>
      </div>
      <div className="navbar-right">
        <Link to="/home" className="nav-link">Home</Link>
        <Link to="/archive" className="nav-link">Archive</Link>
        <span className="nav-link">Profile</span>
      </div>
    </nav>
  );
}

export default Navbar;