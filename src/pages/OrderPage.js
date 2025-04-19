import React, { useState } from 'react'; 
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const OrderPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get the total amount passed from CartPage
  const totalAmount = location.state?.totalAmount || 0;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: 'Nepal',
    city: '',
    postalCode: '',
    paymentMethod: 'Cash on Delivery',
  });

  const [orderSuccess, setOrderSuccess] = useState(false);

  const cities = ['Kathmandu', 'Pokhara', 'Biratnagar'];
  const paymentOptions = ['Cash on Delivery', 'Pay with eSewa'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      ...formData,
      totalAmount,
    };

    try {
      if (formData.paymentMethod === 'Cash on Delivery') {
        // Save order for Cash on Delivery
        await axios.post('http://localhost:5000/api/orders', orderData);
        setOrderSuccess(true);
      } else if (formData.paymentMethod === 'Pay with eSewa') {
        // Handle eSewa payment (Navigate to payment page)
        navigate('/payment', { state: { totalAmount, formData } });

        // Save order for eSewa payment
        await axios.post('http://localhost:5000/api/orders', {
          ...orderData,
          paymentStatus: 'Pending', // eSewa payment is not confirmed yet
        });
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Try again later.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2 style={{ color: 'green' }}>Place your order now.</h2>

      <h3>Order Details</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label><br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email:</label><br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>City:</label><br />
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          >
            <option value="">-- Select City --</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ flex: 1 }}>
            <label>Country:</label><br />
            <input type="text" value="Nepal" name="country" disabled />
          </div>

          <div style={{ flex: 1 }}>
            <label>Postal Code:</label><br />
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div>
          <label>Payment Method:</label><br />
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
          >
            {paymentOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>

        <p style={{ marginTop: '10px' }}>
          <strong>Total Amount:</strong> Rs {totalAmount.toFixed(2)}
        </p>

        <br />
        <button type="submit">Proceed to Payment</button>
      </form>

      {orderSuccess && (
        <div style={{ marginTop: '20px', color: 'green' }}>
          🎉 Order placed successfully with Cash on Delivery!
        </div>
      )}
    </div>
  );
};

export default OrderPage;
