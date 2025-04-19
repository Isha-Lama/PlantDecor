import React, { useState } from "react";
import "../styles/ContactPage.css"; // Create a new CSS file for styles

import Nav from "../components/Nav"; // Importing Nav component
import Diff from "../components/Diff";
import Footer from "../components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send form data to server)
    alert("From Submitted. Thank you for contacting us and visiting our site. Have a wonderful day!");
    window.location.reload();
  };

  return (
    <div className="contact-page">
      <Nav />
      <section className="contact-info">
        <h2>Get In Touch</h2>

        <div className="contact-details">
          <div className="contact-item">
            <h3>Give us a Ring</h3>
            <p>+9779860780980</p>
          </div>

          <div className="contact-item">
            <h3>Our Stores</h3>
            <p>123 Gongabu street, Kathmandu, Nepal (Main Store)</p>
            <p>Khusibu street Nayabazar, Kathmandu, Nepal</p>
          </div>
        </div>
      </section>

      <section className="contact-form">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Message:</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <button className="contact-button" type="submit">Send</button>
        </form>
      </section>

      {/* Optional: Add a Map for store locations */}
      <section className="store-locations">
        <h3>Find Us</h3>
        <iframe
          title="Store Location Map"
          src="https://www.google.com/maps/embed?pb=..."
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </section>

      <Diff />
      <Footer />
    </div>
  );
};

export default Contact;
