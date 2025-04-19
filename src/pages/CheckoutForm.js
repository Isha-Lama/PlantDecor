import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/CheckoutForm.css";

const CheckoutForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const navigate = useNavigate();
  const location = useLocation();
  const totalAmount = location.state?.totalAmount || 0;

  useEffect(() => {
    if (!totalAmount) navigate("/cart");
  }, [totalAmount, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/esewa", {
        totalAmount,
        transaction_uuid: Date.now().toString(),
        ...formData,
      });

      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
      
      Object.entries(response.data).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error("Payment failed", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="checkout-form">
      <h2>Checkout</h2>
      <form>
        <label>Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        <p>Total Amount: ${totalAmount.toFixed(2)}</p>
        <div className="button-group">
          <button type="button" onClick={handlePayment} className="pay-btn">Pay via eSewa</button>
          <button type="button" onClick={() => navigate("/cart")} className="cancel-btn">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;