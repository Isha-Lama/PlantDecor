import React from "react";
import { Link } from "react-router-dom";
import "../styles/About.css";

import Diff from "../components/Diff";


const About = () => {
  // Dynamically set the background image for the hero section
  const heroBackgroundStyle = {
    backgroundImage: "url('/images/hero-bg.jpg')",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="about-page">
      {/* Navbar */}
      <nav className="navvbar">
        <div className="logo">
          <Link to="/">
            <img src={require("../logos/plantlogo.png")} alt="Plant & Decor Store Logo" className="logo-img" />
            Plant & Decor Store
          </Link>
        </div>
        <ul className="navv-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/gifts">Gifts</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="hero" style={heroBackgroundStyle}>
        <h1>About Us</h1>
        <p>Bringing Nature & Elegance to Your Space</p>
      </section>

      {/* Section 1 */}
      <section className="about-section">
        <div className="about-content">
          <div className="about-image">
            <img src="/images/about1.jpg" alt="Indoor Plants" />
          </div>
          <div className="about-text">
            <h2>Our Mission</h2>
            <p>
              At <b>Plant & Decor Store</b>, we are passionate about enhancing your spaces with vibrant greenery and elegant decor. Our goal is to provide high-quality plants, pots, and decor items that bring life to your home.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2 (Alternate Layout) - Reverse the layout here */}
      <section className="about-section">
        <div className="about-content reverse">
          <div className="about-text">
            <h2>Why We Different?</h2>
            <p>
              🌱 <b>Wide Variety:</b>: From succulents to rare exotic plants <br></br>  
              🚚 <b>Fast & Secure Delivery:</b> Ensuring fresh, healthy plants  at your doorstep  <br></br>
              🌍 <b>Eco-Friendly Packaging:</b> We care about nature, just like you!  
            </p>
          </div>
          <div className="about-image">
            <img src="/images/about2.jpg" alt="Decor Ideas" />
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section className="about-section">
        <div className="about-content">
          <div className="about-image">
            <img src="/images/about3.jpg" alt="Gifting" />
          </div>
          <div className="about-text">
            <h2>Perfect Gifts for Plant Lovers</h2>
            <p>
              Looking for a thoughtful gift? Our collection includes stylish pots, rare plants, and decor items that make the perfect present for any nature lover.
            </p>
          </div>
        </div>
      </section>

      <Diff />


      {/* CTA Section */}
      <section className="cta-section">
        <h2>Join Our Green Community!</h2>
        <p>Subscribe for exclusive tips, new arrivals, and special discounts.</p>
        <div className="subscribe-box">
          <input type="email" placeholder="Enter your email" />
          <button>Subscribe</button>
        </div>
      </section>

      <div className="heyfooter">
        <p>&copy; 2025 Plant & Decor Store. All Rights Reserved.</p>
      </div>

    </div>
  );
};

export default About;
