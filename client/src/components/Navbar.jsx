import './Navbar.css';

function Navbar({ name }) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/logo.png" alt="Logo" className="logo" />
        <span className="welcome">Welcome back, {name}</span>
      </div>
      <div className="navbar-right">
        <span className="nav-link">Archive</span>
        <span className="nav-link">Profile</span>
      </div>
    </nav>
  );
}

export default Navbar;