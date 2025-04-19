import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";

import "../../styles/Payment.css"; // Adjust the relative path if necessary


const Payment = () => {
  const location = useLocation();
  const passedTotalAmount = location.state?.totalAmount || 0; // Get total from CartPage

  const [hashInBase64, setHashInBase64] = useState(""); // Holds the signature
  const [transactionUuid] = useState(uuidv4()); // Generate UUID once

  // Ensure amounts are consistent
  const amount = passedTotalAmount; // Use passed total amount
  const taxAmount = 10; // Fixed tax (optional)
  const serviceCharge = 0; // Optional service charge
  const deliveryCharge = 0; // Optional delivery charge

  // Calculate correct total amount
  const totalAmount = amount + taxAmount + serviceCharge + deliveryCharge;
  const productCode = "EPAYTEST"; // Product code

  useEffect(() => {
    if (!totalAmount) return; // Avoid running if totalAmount is not available

    // Corrected message string for signature generation
    const message = `total_amount=${totalAmount},transaction_uuid=${transactionUuid},product_code=${productCode}`;
    const hash = CryptoJS.HmacSHA256(message, "8gBm/:&EnhH.1/q");
    const hashBase64 = CryptoJS.enc.Base64.stringify(hash);

    setHashInBase64(hashBase64);
    console.log("Generated Signature (Base64):", hashBase64);
  }, [totalAmount, transactionUuid]); // Runs only when these values change

  return (
    <div className="payment-container">
      <h2>Payment Form</h2>
      <form action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST">
        <label>Total Amount:</label>
        <input type="text" name="total_amount" value={totalAmount} readOnly required />

        <label>Amount:</label>
        <input type="text" name="amount" value={amount} readOnly required />

        <label>Tax Amount:</label>
        <input type="text" name="tax_amount" value={taxAmount} readOnly required />

        {/* <label>Service Charge:</label> */}
        <input type="hidden" name="product_service_charge" value={serviceCharge} readOnly required />

        <label>Delivery Charge:</label>
        <input type="text" name="product_delivery_charge" value={deliveryCharge} readOnly required />

        {/* <label>Transaction ID:</label> */}
        <input type="hidden" name="transaction_uuid" value={transactionUuid} readOnly required />

        {/* <label>Product Code:</label> */}
        <input type="hidden" name="product_code" value={productCode} readOnly required />

        <input type="hidden" name="success_url" value="http://localhost:3000/success" required />
        <input type="hidden" name="failure_url" value="http://localhost:3000/failure" required />
        <input type="hidden" name="signed_field_names" value="total_amount,transaction_uuid,product_code" required />
        <input type="hidden" name="signature" value={hashInBase64} required />

        <button type="submit">Pay with eSewa</button>
      </form>
    </div>
  );
};

export default Payment;
