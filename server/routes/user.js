const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const User = require('../models/User'); // User model to fetch user data

// Route to get user profile (Protected route)
// The user ID is retrieved from the JWT token's payload (added by authenticateToken middleware)
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    // Get the user by ID using the ID from the JWT token
    const user = await User.findById(req.user.id);  
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return only the necessary user data (name and email)
    res.json({ name: user.name, email: user.email }); 
  } catch (err) {
    // Handle any errors, such as database issues
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
