import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!document.querySelector('.navbar').contains(e.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Navigation Links */}
        <nav className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <ul className="navbar-left">
            <li>
              <Link to="/" className="nav-link">Contact Us</Link>
            </li>
          </ul>

          {/* Logo with img tag */}
          <div className="navbar-logo">
            <Link to="/">
              {/* Image can go here */}
            </Link>
          </div>

          {/* Sign Up & Sign In */}
          <ul className="navbar-right">
            <li>
              <Link to="/sign-up" className="nav-link">Create an Account</Link>
            </li>
            <li>
              <Link to="/sign-in" className="nav-link sign-in-btn">Sign In</Link>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Icon */}
        <div className="navbar-mobile-icon" onClick={handleMobileMenuToggle}>
          <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} size="2x" color="#ecf0f1" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
