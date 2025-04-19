import React, { createContext, useState, useContext, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
  const [cart, setCart] = useState(savedCart);

  useEffect(() => {
    // Whenever cart changes, update it in localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (name, price) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.name !== name || item.price !== price)
    );
  };

  const updateQuantity = (name, price, action) => {
    const itemIndex = cart.findIndex(
      (item) => item.name === name && item.price === price
    );

    if (action === "increase") {
      if (itemIndex !== -1) {
        const itemToAdd = cart[itemIndex];
        setCart((prevCart) => [...prevCart, { ...itemToAdd }]);
      }
    } else if (action === "decrease") {
      if (itemIndex !== -1) {
        const newCart = [...cart];
        newCart.splice(itemIndex, 1); // Remove one instance
        setCart(newCart);
      }
    }
  };

  // Function to clear the cart
  const clearCart = () => {
    setCart([]); // Clear the state
    localStorage.removeItem("cart"); // Remove from localStorage
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
