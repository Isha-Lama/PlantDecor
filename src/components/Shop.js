import React, { useState, useContext, useEffect } from "react";
import "../styles/ProductSection.css";
import "../styles/Shop.css";

import Diff from "../components/Diff";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import { CartContext } from "../context/CartContext"; // Import CartContext
import { useLocation } from "react-router-dom"; // Import useLocation to read the URL

const API_URL = "http://localhost:5000/api/products"; // Your API endpoint for products

const Shop = () => {
  const [visibleCount, setVisibleCount] = useState(8);
  const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products
  const { addToCart, cart } = useContext(CartContext); // Use Cart Context
  const location = useLocation(); // Get location (URL) to extract query parameters

  // Fetch products from the backend and update localStorage
  const fetchProducts = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      // Update localStorage with the fetched products
      localStorage.setItem("shop_products", JSON.stringify(data));
      setFilteredProducts(data); // Update the state with fetched products
    } catch (err) {
      console.error("Error fetching products:", err);
      // Fallback to localStorage if backend fails
      const storedProducts = JSON.parse(localStorage.getItem("shop_products")) || [];
      setFilteredProducts(storedProducts);
    }
  };

  useEffect(() => {
    fetchProducts(); // Fetch products on component mount
  }, []); // Only run once on mount

  // Extract search query from URL and filter products accordingly
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("search"); // Get the search query from URL

    if (query) {
      const filtered = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered); // Update the products based on search
    } else {
      setFilteredProducts(filteredProducts); // If no query, show all products
    }
  }, [location.search, filteredProducts]); // Re-run the filter when the search query changes

  const showMoreProducts = () => {
    setVisibleCount(filteredProducts.length);
  };

  const showLessProducts = () => {
    setVisibleCount(8);
  };

  // Handle adding product to the cart
  const handleAddToCart = (product) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("You must log in to add items to the cart.");
      window.location.href = "/auth"; // Redirect to login page
      return;
    }

    addToCart(product); // Add product to cart via context
  };

  return (
    <div className="shop-page">
      <Nav cartCount={cart.length} /> {/* Pass cart count as a prop to Nav */}

      <section className="product-section">
        <h2 className="section-title">Shop Our Collection</h2>
        <div className="product-grid">
          {filteredProducts.slice(0, visibleCount).map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-image">
                <img src={product.image} alt={product.title} />
                <div className="overlay">
                  <button className="add-to-cart" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                  <i className="fas fa-heart fav-icon"></i>
                </div>
              </div>
              <h3 className="product-title">{product.title}</h3>
              <p className="product-description">{product.description}</p>
              <p className="product-price">Rs{product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>

        <div className="buttons-container">
          {visibleCount < filteredProducts.length && (
            <button className="show-more-btn" onClick={showMoreProducts}>
              Show More
            </button>
          )}
          {visibleCount === filteredProducts.length && (
            <button className="show-less-btn" onClick={showLessProducts}>
              Show Less
            </button>
          )}
        </div>
      </section>

      <Diff />
      <Footer />
    </div>
  );
};

export default Shop;
