
const express = require('express');
const router = express.Router();
const { registerController, loginController } = require('../Controller/authController.js');

// Render Form Page
router.get('/Form', (req, res) => {
    res.render('Form');  // form.ejs
});

// Register Route
router.post('/register', registerController);

// Login Route
router.post('/login', loginController);

module.exports = router;
