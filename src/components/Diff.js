// Diff.js
import React from "react";
import { FaShippingFast, FaHeadset, FaRegCreditCard, FaUndo } from "react-icons/fa"; // Importing icons

import "../styles/Diff.css"; // Assuming you will create a CSS file for this section

const Diff = () => {
  return (
    <section className="diff-section">
      <h2 className="diff-title">Why Choose Us?</h2>
      <div className="diff-grid">
        <div className="diff-item">
          <FaShippingFast className="diff-icon" />
          <h3>Fast Shipping</h3>
          <p>Get your orders delivered swiftly to your doorstep with express shipping options.</p>
        </div>
        <div className="diff-item">
          <FaHeadset className="diff-icon" />
          <h3>24/7 Customer Support</h3>
          <p>Our support team is available around the clock to assist you with your queries.</p>
        </div>
        <div className="diff-item">
          <FaRegCreditCard className="diff-icon" />
          <h3>Secure Payment</h3>
          <p>Make payments with confidence using secure and trusted payment gateways.</p>
        </div>
        <div className="diff-item">
          <FaUndo className="diff-icon" />
          <h3>Easy Returns</h3>
          <p>Enjoy hassle-free returns on products with a simple and straightforward process.</p>
        </div>
      </div>
    </section>
  );
};

export default Diff;
