import React, { useState } from 'react';
import './Nav.css';

/**
 * Navigation component with responsive hamburger menu.
 * Provides accessible navigation links to all main sections.
 */
function Nav({ currentPage, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'menu', label: 'Menu' },
    { id: 'reservations', label: 'Reservations' },
    { id: 'order', label: 'Order Online' },
    { id: 'login', label: 'Login' },
  ];

  const handleNav = (id) => {
    onNavigate(id);
    setMenuOpen(false);
  };

  return (
    <nav className="nav" role="navigation" aria-label="Main navigation">
      <div className="nav__inner container">
        {/* Logo */}
        <button
          className="nav__logo"
          onClick={() => handleNav('home')}
          aria-label="Little Lemon - Go to homepage"
        >
          <span className="nav__logo-ll">Little</span>
          <span className="nav__logo-lemon">Lemon</span>
        </button>

        {/* Desktop links */}
        <ul className="nav__links">
          {links.map((link) => (
            <li key={link.id}>
              <button
                className={`nav__link${currentPage === link.id ? ' nav__link--active' : ''}`}
                onClick={() => handleNav(link.id)}
                aria-current={currentPage === link.id ? 'page' : undefined}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Hamburger for mobile */}
        <button
          className={`nav__hamburger${menuOpen ? ' nav__hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`nav__mobile${menuOpen ? ' nav__mobile--open' : ''}`}
        role="region"
        aria-label="Mobile navigation"
      >
        <ul>
          {links.map((link) => (
            <li key={link.id}>
              <button
                className={`nav__mobile-link${currentPage === link.id ? ' nav__mobile-link--active' : ''}`}
                onClick={() => handleNav(link.id)}
                aria-current={currentPage === link.id ? 'page' : undefined}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Nav;