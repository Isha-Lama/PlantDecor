import React from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/"); // Redirects to the homepage
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Transaction Successful</h1>
      <p>Your payment has been successfully processed. Thank you for your purchase!</p>
      <button 
        onClick={handleRedirect} 
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer"
        }}
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default Success;
