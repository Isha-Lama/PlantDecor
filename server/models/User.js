const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: function() {
      return this.isNew; // Only require name for new users (i.e., registration)
    },
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
    lowercase: true,
    trim: true, // Trim leading and trailing spaces
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please fill a valid email address'], // Email validation regex
  },
  password: {
    type: String,
    required: true,
  },
});

// Hash password before saving to the database
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next(); // Skip hashing if password wasn't modified

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare hashed password during login
userSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password); // Compare provided password with hashed password
};

// Create and export the User model
const User = mongoose.model('User', userSchema);
module.exports = User;
