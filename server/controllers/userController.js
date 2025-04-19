const User = require('../models/User');  // Import User model

// Controller function for getting the user's profile
exports.getProfile = (req, res) => {
  const userId = req.user.id;  // Assuming the user ID is decoded from the JWT token

  // Find the user by ID in the database
  User.findById(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({
        name: user.name,
        email: user.email,
        // You can add any other fields you want to include in the profile
      });
    })
    .catch(error => {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Server error' });
    });
};
