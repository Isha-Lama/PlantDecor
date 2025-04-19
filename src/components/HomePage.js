// src/pages/HomePage.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/HomePage.css";
import Nav from "../components/Nav"; // Importing Nav component
import ProductSection from "../components/ProductSection";
import InspoSection from "../components/InspoSection";
import GiftSection from "../components/GiftSection";
import BlogSection from "../components/BlogSection";
import Diff from "../components/Diff";
import Footer from "../components/Footer";

const HomePage = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="home-page">
      <Nav /> {/* Including the Nav component here */}

      {/* Hero Section */}
      <section className="hero-section" style={{ backgroundImage: `url('/images/home.jpg')` }}>
        <div 
          className="hero-content" 
          style={{ opacity: Math.max(1 - scrollPosition / 300, 0), transition: "opacity 0.3s ease" }}
        >
          <h1 className="hero-title">Bring Nature into Your Home</h1>
          <p className="hero-subtitle">Beautiful indoor plants and decor for every space.</p>
          <Link to="/shop" className="buy-now-btn">Buy Now</Link>
        </div>
      </section>

      {/* Other homepage sections */}
      <ProductSection />
      <InspoSection />
      <GiftSection />
      <BlogSection />
      <Diff />
      <Footer />
    </div>
  );
};

export default HomePage;
