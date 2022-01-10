const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const productController = require('../controllers/productController');
const cartController = require('../controllers/cartController');

// Main Routes

router.get('/', mainController.home);
router.get('/login', mainController.login);
router.get('/register', mainController.register);

// Product Routes

router.get('/', productController.products);
router.get('/', productController.single_product);

// Cart Routes

router.get('/', cartController.cart);

// Export

module.exports = router;