import React, { useState, useContext } from "react";
import "../styles/Nav.css";
import logo from "../logos/plantlogo.png";
import { CartContext } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { cart } = useContext(CartContext);

  // Calculate total number of items in the cart
  const cartItemCount = cart.length;

  const navigate = useNavigate();

  const handleProfileClick = () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/user-profile"); // If logged in, go to the user profile page
    } else {
      navigate("/auth"); // If not logged in, go to the login page
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      navigate(`/shop?search=${searchQuery}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Brand Logo" className="logo" />
        <span className="brand-name">Plant & Decor Store</span>
      </div>

      <div className="navbar-center">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>

      <div className="navbar-right">
        {/* Profile Icon Link */}
        <div className="icon" onClick={handleProfileClick}>
          <i className="fas fa-user"></i> {/* Profile Icon */}
        </div>

        <div className="icon" onClick={toggleSearch}><i className="fas fa-search"></i></div>
        <div className="icon"><i className="fas fa-heart"></i></div>

        {/* Cart Icon with Count */}
        <div className="icon cart-icon">
          <Link to="/cart">
            <i className="fas fa-shopping-cart"></i>
            {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      {isSearchOpen && (
        <div className="search-bar">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search products..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">Search</button>
          </form>
        </div>
      )}
    </nav>
  );
};

export default Nav;
