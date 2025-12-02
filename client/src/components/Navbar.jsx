// client/src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBook, FaUser, FaSignOutAlt, FaHome } from 'react-icons/fa';
import { authService } from '../services/authService';

const Navbar = () => {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();
  const isAuthenticated = authService.isAuthenticated();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo/Brand */}
        <div className="nav-brand">
          <Link to="/" className="logo-link">
            <FaBook className="logo-icon" />
            <span className="logo-text">BookHub</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="nav-links">
          <Link to="/" className="nav-link">
            <FaHome /> Home
          </Link>
          
          {isAuthenticated && (
            <>
              <Link to="/books" className="nav-link">
                Books
              </Link>
              <Link to="/books/add" className="nav-link">
                Add Book
              </Link>
            </>
          )}
        </div>

        {/* User Section */}
        <div className="nav-user">
          {isAuthenticated ? (
            <div className="user-info">
              <div className="user-greeting">
                <FaUser className="user-icon" />
                <span>Hello, {currentUser?.name || 'User'}!</span>
              </div>
              <button onClick={handleLogout} className="logout-btn">
                <FaSignOutAlt /> Logout
              </button>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="auth-link login-link">
                Login
              </Link>
              <Link to="/register" className="auth-link register-link">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;