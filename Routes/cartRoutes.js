const express = require('express');
const router = express.Router();
const cartController = require('../Controller/cartController');

router.get('/cart', cartController.getCartPage);
module.exports = router;
