import React from 'react';
import './Footer.css';

/**
 * Footer component with navigation links, contact info and social media links.
 */
function Footer({ onNavigate }) {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner container">
        {/* Brand */}
        <div className="footer__brand">
          <button
            className="footer__logo"
            onClick={() => onNavigate('home')}
            aria-label="Little Lemon homepage"
          >
            <span className="footer__logo-main">Little Lemon</span>
            <span className="footer__logo-sub">Restaurant</span>
          </button>
          <p className="footer__tagline">
            A family owned Mediterranean restaurant, <br />
            focused on traditional recipes served with <br />
            a modern twist.
          </p>
        </div>

        {/* Nav */}
        <nav aria-label="Footer navigation">
          <h3 className="footer__heading">Doormat Navigation</h3>
          <ul className="footer__list" role="list">
            {['Home', 'About', 'Menu', 'Reservations', 'Order Online', 'Login'].map((item) => (
              <li key={item}>
                <button
                  className="footer__link"
                  onClick={() => onNavigate(item.toLowerCase().replace(' ', ''))}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <address className="footer__contact">
          <h3 className="footer__heading">Contact</h3>
          <ul className="footer__list" role="list">
            <li>
              <a href="tel:+13125550167" className="footer__link" aria-label="Call us at +1 312 555 0167">
                +1 (312) 555-0167
              </a>
            </li>
            <li>
              <a href="mailto:hello@littlelemon.com" className="footer__link" aria-label="Email us">
                hello@littlelemon.com
              </a>
            </li>
            <li className="footer__address">
              263 S Wabash Ave,<br />
              Chicago, IL 60604
            </li>
          </ul>
        </address>

        {/* Social */}
        <div className="footer__social">
          <h3 className="footer__heading">Social Media Links</h3>
          <ul className="footer__list" role="list">
            <li>
              <a href="https://facebook.com" className="footer__link" target="_blank" rel="noopener noreferrer" aria-label="Visit Little Lemon on Facebook">
                Facebook
              </a>
            </li>
            <li>
              <a href="https://instagram.com" className="footer__link" target="_blank" rel="noopener noreferrer" aria-label="Visit Little Lemon on Instagram">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://twitter.com" className="footer__link" target="_blank" rel="noopener noreferrer" aria-label="Visit Little Lemon on Twitter">
                Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <p>&copy; {new Date().getFullYear()} Little Lemon. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
