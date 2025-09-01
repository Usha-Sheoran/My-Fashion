
  const pool = require('../db');

  exports.getCartPage = async (req, res) => {
    try {
      const userId = req.session.user?.id;

      if (!userId) {
        // 🟢 Guest user → session cart
        const cart = req.session.cart || [];
        return res.render('cart', { cart });
      }

      // 🟢 Logged-in user → DB cart
      const cartItems = await pool.query(
        'SELECT * FROM cart WHERE user_id = $1',
        [userId]
      );

      return res.render('cart', { cart: cartItems.rows });

    } catch (err) {
      console.error('Error fetching cart:', err);
      res.status(500).send('Internal Server Error');
    }
  };
