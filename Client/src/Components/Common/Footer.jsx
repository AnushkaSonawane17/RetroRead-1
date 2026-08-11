import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="logo-icon-small">
                <span>R</span>
              </div>
              <span className="footer-logo-text">RetroRead</span>
            </div>
            <p className="footer-description">
              AI-powered social reading platform where you can read, exchange, 
              and discover books while earning rewards.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link">📘</a>
              <a href="#" className="social-link">🐦</a>
              <a href="#" className="social-link">📸</a>
              <a href="#" className="social-link">▶️</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/library">Library</Link></li>
              <li><Link to="/marketplace">Marketplace</Link></li>
              <li><Link to="/exchange">Book Exchange</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="footer-title">Support</h3>
            <ul className="footer-links">
              <li><Link to="/help">Help Center</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="footer-title">Stay Connected</h3>
            <p className="footer-newsletter-text">
              Subscribe to get updates on new books and features.
            </p>
            <div className="newsletter-form">
              <input
                type="email"
                placeholder="Your email"
                className="newsletter-input"
              />
              <button className="newsletter-btn">Subscribe</button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {currentYear} RetroRead. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;