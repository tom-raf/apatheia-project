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
        <span className="nav-link">Archive</span>
        <span className="nav-link">Profile</span>
      </div>
    </nav>
  );
}

export default Navbar;