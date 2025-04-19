import React from "react";
import { Link } from "react-router-dom";
import "../styles/GiftsPage.css";

import Nav from "../components/Nav"; // Importing Nav component


const allGifts = [
  { id: 1, name: "Luxury Plant Pot", image: "/images/gift1.jpg", price: "$25", description: "A beautifully crafted luxury plant pot to enhance your home decor." },
  { id: 2, name: "Minimalist Vase", image: "/images/gift2.jpg", price: "$30", description: "A simple yet elegant vase for your favorite flowers." },
  { id: 3, name: "Hand-Painted Cups", image: "/images/gift3.jpg", price: "$45", description: "A set of hand-painted cups, perfect for tea or coffee lovers." },
  { id: 4, name: "Coffee Scented Candle", image: "/images/gift4.jpg", price: "$20", description: "A soothing candle with a rich coffee scent, ideal for relaxing moments." },
  { id: 5, name: "Customized Wooden Nameplates", image: "/images/gift5.jpg", price: "$35", description: "Personalized wooden nameplates for a touch of uniqueness." },
  { id: 6, name: "Wall Art", image: "/images/gift6.jpg", price: "$40", description: "Gorgeous wall art that brings beauty to any room." },
  { id: 7, name: "Wooden Lamp", image: "/images/gift7.jpg", price: "$15", description: "A rustic wooden lamp, perfect for cozy evenings." },
  { id: 8, name: "Plant Stand", image: "/images/gift8.jpg", price: "$50", description: "A stylish plant stand to elevate your indoor plants." },
  { id: 9, name: "Decor Gift Set", image: "/images/gift9.jpg", price: "$60", description: "A curated gift set that includes various decorative items." },
];

const GiftsPage = () => {
  return (
    <section className="gifts-page">
      <Nav/>
      <h2 className="page-title">All Gifts & Accessories</h2>
      <div className="gift-grid">
        {allGifts.map((gift) => (
          <div key={gift.id} className="gift-box">
            <img src={gift.image} alt={gift.name} className="gift-image" />
            <h3 className="gift-name">{gift.name}</h3>
            <p className="gift-price">{gift.price}</p>
            <p className="gift-description">{gift.description}</p>
            <Link to={`/product/${gift.id}`} className="view-product-btn">View Product</Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GiftsPage;
