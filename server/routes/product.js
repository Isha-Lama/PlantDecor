const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/', productController.addProduct);
router.get('/', productController.getAllProducts);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
