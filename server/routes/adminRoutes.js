// server/routes/adminRoutes.js
const express = require('express');
const { addProduct, getAllProducts, updateProduct, deleteProduct } = require('../controllers/adminProductController');
const router = express.Router();

// Routes
router.get('/products', getAllProducts);
router.post('/products', addProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

module.exports = router;
