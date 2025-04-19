import React from "react";
import "../styles/InspoSection.css";

const InspoSection = () => {
  const inspoData = [
    { img: "/images/inspo1.jpg", title: "Cozy Living Room" },
    { img: "/images/inspo2.jpg", title: "Modern Minimalist" },
    { img: "/images/inspo3.jpg", title: "Boho Vibes" },
    // Add more inspiration data as necessary
  ];

  return (
    <section className="inspo-section">
      {/* Left Side: Text Content */}
      <div className="inspo-text">
        <h2 className="inspo-title">50+ Beautiful Rooms Inspiration</h2>
        <p className="inspo-subtitle">
          Transform your space with stunning decor inspirations. Find the perfect aesthetic for your home.
        </p>
        <button className="explore-btn">Explore More</button>
      </div>

      {/* Right Side: Scrollable Cards */}
      <div className="inspo-cards">
        {inspoData.map((item, index) => (
          <div className="card" key={index}>
            <img src={item.img} alt={`Room Inspo ${index + 1}`} />
            <div className="card-title">{item.title}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InspoSection;
