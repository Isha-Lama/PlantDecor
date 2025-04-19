import React, { useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

// Add eSewa logo as an image or use another icon if available
import eSewaLogo from "../logos/esewa-logo.png"; // Make sure to have this image in your assets folder

import "../styles/Footer.css"; // Ensure you have a CSS file for styling

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = () => {
    if (email) {
      // Simulate successful subscription
      setMessage("Thank you for subscribing!");
      setEmail(""); // Clear the email input
    } else {
      setMessage("Please enter a valid email.");
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Social Media */}
        <div className="social-media">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com/plantdecor" className="social-icon"><FaFacebookF /></a>
            <a href="https://facebook.com/plantdecor" className="social-icon"><FaTwitter /></a>
            <a href="https://facebook.com/plantdecor" className="social-icon"><FaInstagram /></a>
            <a href="https://facebook.com/plantdecor" className="social-icon"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* Newsletter */}
        <div className="newsletter">
          <h3>Subscribe to Our Newsletter</h3>
          <p>Get the latest updates and special offers delivered to your inbox.</p>
          <div className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              className="email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="subscribe-btn" onClick={handleSubscribe}>Subscribe</button>
          </div>
          {message && <p className="subscription-message">{message}</p>}
        </div>

        {/* Customer Care */}
        <div className="customer-care">
          <h3>Customer Care</h3>
          <ul>
            <li><a href="https://facebook.com/plantdecor">FAQs</a></li>
            <li><a href="https://facebook.com/plantdecor">Shipping & Delivery</a></li>
            <li><a href="https://facebook.com/plantdecor">Returns & Exchanges</a></li>
            <li><a href="https://facebook.com/plantdecor">Privacy Policy</a></li>
            <li><a href="https://facebook.com/plantdecor">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="contact">
          <h3>Contact Us</h3>
          <p><FaPhoneAlt /> +9779860780980</p>
          <p><FaEnvelope /> support@plantdecor.com</p>
          <p><FaMapMarkerAlt /> 123 Gongabu street, Kathmandu, Nepal</p>
        </div>

        {/* Payment Methods */}
        <div className="payment-methods">
          <h3>We Accept</h3>
          <div className="payment-icons">
            <img src={eSewaLogo} alt="eSewa" className="payment-icon" />
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; 2025 Plant & Decor Store. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
