    const pool = require('../db');
    const express=require('express')
    const bcrypt = require('bcryptjs');
    const router = express.Router();


    exports.registerController = async (req, res) => {
        const { name, email, password } = req.body;
        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            await pool.query(
                'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
                [name, email, hashedPassword]
            );

            console.log("User Registered:", name, email);
            res.redirect('/');  // Home page redirect
        } catch (err) {
            console.error(err);
            res.status(500).send('Error in Registration');
        }
    };

    exports.loginController = async (req, res) => {
        const { email, password } = req.body;

        try {
            const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
            const user = result.rows[0];

            if (!user) {
                return res.send('Invalid Email or Password');
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.send('Invalid Email or Password');
            }

            // Insert Login History
            await pool.query('INSERT INTO login_history (user_id) VALUES ($1)', [user.id]);

            // Save user in session
            req.session.user = { id: user.id, name: user.name };
            res.redirect('/');  // Home page redirect
        } catch (err) {
            console.error(err);
            res.status(500).send('Login Failed');
        }
    };
    // Logout
    router.get('/logout', (req, res) => {
        req.session.destroy(err => {
            if (err) {
                return res.send('Logout Failed');
            }
            res.redirect('/');
            res.clearCookie('connect.sid');
            res.redirect('/');
        });
    });