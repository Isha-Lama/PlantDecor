import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "../styles/CartPage.css";
import Nav from "../components/Nav";
import Diff from "../components/Diff";
import Footer from "../components/Footer";


const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart(); // Assuming you have a method for updating quantity in CartContext
  const navigate = useNavigate(); // Initialize navigate for routing

  // Calculate total price (sum of item price * quantity)
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price) || 0; // Ensure price is a valid number
      const quantity = parseInt(item.quantity, 10) || 1; // Ensure quantity is a valid number (defaults to 1)
      return total + price * quantity;
    }, 0);
  };

  // Handle checkout and navigate to payment page with total amount
  const handleCheckout = () => {
    const totalAmount = calculateTotalPrice();
    navigate("/order", { state: { totalAmount } }); // Pass totalAmount to payment page
  };

  // Handle removing an item from the cart
  const handleRemove = (name, price) => {
    removeFromCart(name, price);
  };

  // Handle increasing quantity
  const handleIncrease = (name, price) => {
    updateQuantity(name, price, "increase"); // Assuming updateQuantity method in CartContext
  };

  // Handle decreasing quantity
  const handleDecrease = (name, price) => {
    updateQuantity(name, price, "decrease"); // Assuming updateQuantity method in CartContext
  };

  // Group products by name and price to track quantity of each product
  const groupedProducts = cart.reduce((acc, product) => {
    const existingProduct = acc.find(item => item.name === product.name && item.price === product.price);
    if (existingProduct) {
      existingProduct.quantity += 1; // Increment quantity for duplicate products
    } else {
      acc.push({ ...product, quantity: 1 }); // Add new product with quantity 1
    }
    return acc;
  }, []);

  return (
    <div className="cart-page">
      <Nav />
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty. Start adding products!</p>
      ) : (
        <div className="cart-items">
          {groupedProducts.map((product) => (
            <div className="cart-item" key={product.name + product.price}>
              <img src={product.image} alt={product.title} />
              <div className="cart-item-details">
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <p>Rs {product.price.toFixed(2)}</p>
              </div>

              <div className="cart-item-action">
                <div className="quantity-controls">
                  <button onClick={() => handleDecrease(product.name, product.price)}>-</button>
                  <p>Quantity: {product.quantity}</p>
                  <button onClick={() => handleIncrease(product.name, product.price)}>+</button>
                </div>
                <button onClick={() => handleRemove(product.name, product.price)}>
                  Remove from Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Display total price */}
      <div className="cart-summary">
      <p style={{ textAlign: 'center' }}>
  <b>Total: Rs</b> {calculateTotalPrice().toFixed(2)}
</p>

        <div className="checkout-button">
          <button onClick={handleCheckout}>Proceed to Checkout</button>
        </div>
      </div>
      <Diff />
      <Footer />
    </div>
    
  );
};

export default CartPage;
