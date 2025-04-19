require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product'); // Make sure to define the Product model properly

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    
    // Example seed data
    const seedProducts = [
      { name: 'Product 1', price: 10.99, description: 'A beautiful plant' },
      { name: 'Product 2', price: 15.99, description: 'A decorative pot' },
    ];

    // Inserting seed data into the database
    Product.insertMany(seedProducts)
      .then(() => {
        console.log('Data seeded successfully');
        mongoose.disconnect(); // Disconnect after seeding
      })
      .catch((err) => {
        console.error('Error seeding data:', err);
        mongoose.disconnect();
      });
  })
  .catch((err) => {
    console.error('Connection failed:', err);
  });
