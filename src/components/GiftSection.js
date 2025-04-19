import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/GiftSection.css";

// Sample gift products
const gifts = [
  { id: 1, name: "Luxury Plant Pot", image: "/images/gift1.jpg", price: "$25" },
  { id: 2, name: "Minimalist Vase", image: "/images/gift2.jpg", price: "$30" },
  { id: 3, name: "Hand Painted Cup", image: "/images/gift3.jpg", price: "$45" },
  { id: 4, name: "Coffee-Scented Candle", image: "/images/gift4.jpg", price: "$20" },
  { id: 5, name: "Wooden Name plates", image: "/images/gift5.jpg", price: "$35" },
  { id: 6, name: "Wall Art", image: "/images/gift6.jpg", price: "$40" },
  { id: 7, name: "Led Signs", image: "/images/gift7.jpg", price: "$15" },
  { id: 8, name: "Wooden Plant Stand", image: "/images/gift8.jpg", price: "$50" },
  { id: 9, name: "Decor Gift Set", image: "/images/gift9.jpg", price: "$60" },
];

const GiftSection = () => {
  const [favorites, setFavorites] = useState([]);

  const handleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <section className="gift-section">
      <h2 className="gift-title">Gifts & Accessories</h2>
      <div className="gift-grid">
        {gifts.map((gift) => (
          <div key={gift.id} className="gift-card">
            <div className="gift-image-container">
              <img
                src={gift.image}
                alt={gift.name}
                className="gift-image"
              />
              <div className="gift-overlay">
                <button
                  className={`fav-btn ${favorites.includes(gift.id) ? "active" : ""}`}
                  onClick={() => handleFavorite(gift.id)}
                >
                  <i className="fas fa-heart fav-icon"></i> {/* Using Font Awesome Heart Icon */}
                </button>
                <button className="cart-btn">🛒 Add to Cart</button>
              </div>
            </div>
            <h3 className="gift-name">{gift.name}</h3>
            <p className="gift-price">{gift.price}</p>
          </div>
        ))}
      </div>
      <Link to="/gifts" className="view-all-btn">View All</Link>
    </section>
  );
};

export default GiftSection;
