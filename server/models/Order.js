// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: String,
  email: String,
  country: String,
  city: String,
  postalCode: String,
  paymentMethod: String,
  totalAmount: Number,
   // Optional field for eSewa
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
