import { NavLink, Link } from 'react-router-dom';
import { useAuth } from './hooks/useAuth.jsx';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';
import logo from './assets/logo.png';

const Navbar = () => { 
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/" onClick={closeMenu}>
          <img src={logo} alt="Mooves Logo" />
        </Link>
      </div>

      <div className="menu-icon" onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <li>
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeMenu}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/car-rent" className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeMenu}>
            Car rents
          </NavLink>
        </li>
        <li>
          <NavLink to="/business-solution" className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeMenu}>
            Business Solution
          </NavLink>
        </li>
        <li>
          <NavLink to="/flight-booking" className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeMenu}>
            Flight Booking
          </NavLink>
        </li>
        <li>
          <NavLink to="/fleet" className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeMenu}>
            Fleet
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeMenu}>
            About Us
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeMenu}>
            Contact
          </NavLink>
        </li>
        <li className="nav-auth-mobile">
          {user ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#16a673', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', overflow: 'hidden' }}>
                  {user.photoURL ? <img src={user.photoURL} alt="profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span style={{ fontSize: '14px' }}>{user.displayName?.charAt(0) || user.email?.charAt(0)}</span>}
                </div>
                <span style={{ fontWeight: 600, color: '#333' }}>{user.displayName || user.email}</span>
              </div>
              <button onClick={() => { logout(); closeMenu(); }} className="nav-logout-btn" style={{ background: 'none', border: '1px solid #ccc', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}>Logout</button>
            </div>
          ) : (
            <>
              <Link to="/login" className="nav-login" onClick={closeMenu}>Login</Link>
              <Link to="/signup" className="nav-signup" onClick={closeMenu}>Signup</Link>
            </>
          )}
        </li>
      </ul>

      <div className="nav-auth">
        {user ? (
          <div className="user-profile-nav" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="user-name" style={{ fontWeight: '600', color: '#333' }}>
              {user.displayName || user.email}
            </span>
            <div className="user-icon-container" style={{ width: '35px', height: '35px', borderRadius: '50%', backgroundColor: '#16a673', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', color: 'white', overflow: 'hidden' }}>
              {user.photoURL ? <img src={user.photoURL} alt="profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span>{user.displayName?.charAt(0) || user.email?.charAt(0)}</span>}
            </div>
            <button onClick={logout} className="nav-logout-btn" style={{ background: 'none', border: '1px solid #ccc', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', fontSize: '12px' }}>Logout</button>
          </div>
        ) : (
          <>
            <Link to="/login" className="nav-login">Login</Link>
            <Link to="/signup" className="nav-signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
