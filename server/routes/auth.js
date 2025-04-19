const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

// Register Route (Handles user registration)
router.post('/register', register);

// Login Route (Handles user login and authentication)
router.post('/login', login);

module.exports = router;
