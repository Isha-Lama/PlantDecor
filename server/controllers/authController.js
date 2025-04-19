const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register Route
const register = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password (this only happens during registration)
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password with bcrypt
    

    //console.log("Stored hashed password:", user.password);
//console.log("Entered password:", password);


    // Create new user with the hashed password
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
    });

    // Save the new user to the database
    await newUser.save();
    console.log('New user saved:', newUser); // Log user after save

    // Generate a JWT token for the user
    const payload = {
      user: {
        id: newUser._id, // Use _id for MongoDB documents
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send the token back to the client
    res.status(201).json({
      message: 'User registered successfully',
      token,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login Route
const login = async (req, res) => {
  
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User does not exist.' });
    }

    // Log the stored hashed password for debugging
    console.log(`Stored hashed password: ${user.password}`);

    // Compare entered password with the stored hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password); // Proper password comparison
    console.log(`Password comparison result: ${isMatch}`); // Log the comparison result

    if (!isMatch) {
      return res.status(400).json({ message: 'Password mismatch.' });
    }

    // Generate a JWT token for the user
    const payload = {
      user: {
        id: user._id, // Use _id for MongoDB documents
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send the token back to the client
    res.json({
      message: 'Login successful',
      token,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get User Profile Route
const getUserProfile = async (req, res) => {
  try {
    // Get the user ID from the JWT payload
    const userId = req.user.id;

    // Find the user by ID and exclude the password from the response
    const user = await User.findById(userId).select('-password'); // Exclude password field

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send the user profile data back
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register, login, getUserProfile };
