import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>We are a leading e-commerce platform offering a wide range of products to meet all your needs. Our mission is to provide a seamless shopping experience with top-notch customer service.</p>
        </div>
        <div className="footer-section">
          <h3>Customer Service</h3>
          <ul>
            <li><a href="/contact-us">Contact Us</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/returns">Returns & Exchanges</a></li>
            <li><a href="/shipping">Shipping & Delivery</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
          </div>
        </div>
        <div className="footer-section">
          <h3>Newsletter</h3>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 E-Commerce Website. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
