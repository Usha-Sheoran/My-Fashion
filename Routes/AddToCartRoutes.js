const express = require('express');
const router = express.Router();
const AddTocartController = require('../Controller/AddToCartController');
const SearchController = require('../Controller/AddToCartController');


// // Show Cart
router.post('/cart/add-to-cart', AddTocartController.addToCart);
// Remove item from cart
router.post('/cart/remove/:id', AddTocartController.removeFromCart);
router.get("/search", SearchController.searchProducts);


module.exports = router;
