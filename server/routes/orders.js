// routes/orders.js (or ordersController.js)
const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // Order Model

// Create a new order
router.post('/', async (req, res) => {
  const { name, email, country, city, postalCode, paymentMethod, totalAmount, paymentStatus = 'Pending' } = req.body;

  try {
    const newOrder = new Order({
      name,
      email,
      country,
      city,
      postalCode,
      paymentMethod,
      totalAmount,
      paymentStatus,
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ error: 'Failed to save order. Try again later.' });
  }
});

module.exports = router;
