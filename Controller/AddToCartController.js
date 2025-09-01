
  const { redirect } = require('statuses');
  const pool = require('../db');

  const allowedTables = {
    products: 'products',
    boxes: 'boxes',
    womenformal: 'womenformal',
    explore_items: 'explore_items',
    'explore-items': 'explore_items',
  
  };



  exports.addToCart = async (req, res) => {
    //cart ko count krle ke liye
    if (!req.session.cart) {
      req.session.cart = [];
  }

  req.session.cart.push({
      id: req.body.product_id,
      name: req.body.product_name,
      price: req.body.price
  });

    try {
      const { product_id, product_type } = req.body;
      const userId = req.session.user?.id;

      // 1. User login check
      if (!userId) return res.redirect('/login');

      // 2. Table name safe matching (case-insensitive)
      
      const typeKey = (product_type || '').toLowerCase().replace(/-/g, '_');
      const tableName = allowedTables[typeKey];


      // 3. Validation check
      if (!product_id || !tableName) {
        console.log("Invalid product data:", req.body);
        return res.status(400).send('Invalid product data');
      }

      // 4. Fetch product details
      const productQuery = `SELECT * FROM ${tableName} WHERE id = $1`;
      const productResult = await pool.query(productQuery, [Number(product_id)]);

      if (productResult.rows.length === 0) {
        return res.status(404).send('Product not found');
      }

      const product = productResult.rows[0];
      const productName = product.title || product.label || product.product_name || '';
      const productPrice = product.price || 0;
      const productImage = product.image_path || product.image || '';

      // 5. Check if product is already in cart
      const existing = await pool.query(
        `SELECT * FROM cart WHERE user_id = $1 AND product_id = $2 AND product_type = $3`,
        [userId, Number(product_id), tableName]
      );

      if (existing.rows.length > 0) {
        // 6. Update quantity (rating column used as quantity)
        await pool.query(
          `UPDATE cart 
          SET rating = rating + 1 
          WHERE user_id = $1 AND product_id = $2 AND product_type = $3`,
          [userId, Number(product_id), tableName]
        );
      } else {
        // 7. Insert new cart item
        await pool.query(
          `INSERT INTO cart 
          (user_id, product_id, product_type, product_name, price, product_image, rating) 
          VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [userId, Number(product_id), tableName, productName, productPrice, productImage, 1]
        );
      }

      // 8. Redirect to cart
      res.redirect('/cart');

    } catch (err) {
      console.error('Add to cart error:', err);
      res.status(500).send('Something went wrong');
    }
  };

  exports.removeFromCart = async (req, res) => {
    try {
      const userId = req.session.user?.id;
      const productId = Number(req.params.id);

      if (!userId) {
        return res.redirect('/login');
      }

      // Delete product from cart table for this user
      await pool.query(
        `DELETE FROM cart WHERE user_id = $1 AND product_id = $2`,
        [userId, productId]
      );

      res.redirect('/cart');

    } catch (err) {
      console.error('Error removing from cart:', err);
      res.status(500).send('Internal Server Error');
    }
  };

  exports.searchProducts = async (req, res) => {
    try {
      const { search } = req.query;

      if (!search) {
        return res.status(400).send("Search term missing");
      }

      // Multiple keyword search
      const keywords = [
        search,
        search.replace(/s$/, ''),  // plural removal
        search + 's',
        search.slice(0, -1),
      ];

      const sql = `
      
    SELECT 'products' AS source, id, title AS name, price, image_path 
    FROM products WHERE title ILIKE ANY($1)

    UNION ALL

    SELECT 'boxes' AS source, id, label AS name, price, image_path 
    FROM boxes WHERE label ILIKE ANY($1)

    UNION ALL

    SELECT 'womenformal' AS source, id, product_name AS name, price, image_path 
    FROM womenformal WHERE product_name ILIKE ANY($1)

    UNION ALL

    SELECT 'explore_items' AS source, id, product_name AS name, price, image_path 
    FROM explore_items WHERE product_name ILIKE ANY($1)`
  ;

      const values = [keywords.map(k => `%${k}%`)];
      const result = await pool.query(sql, values);

      res.render("search", { 
        products: result.rows,
        search: search,
        // tableName: "all"  
      });

    } catch (error) {
      console.error("Search error:", error);
      res.status(500).send("Internal server error");
    }
  };
