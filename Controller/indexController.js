  const pool = require('../db');

  exports.getLoginPage = (req, res) => {
      res.render('form'); // 'form' is your form.ejs file
  };
  exports.logoutUser = (req, res) => {
      req.session.destroy((err) => {
          if (err) {
              console.log('Logout Error:', err);
              return res.redirect('/');
          }
          res.clearCookie('connect.sid');  // Important: clear session cookie
          res.redirect('/'); // After logout, redirect to Home
      });
  };


  // Home Page Controller
  exports.getHomePage = async (req, res) => {
    try {
      const sliderQuery = await pool.query('SELECT * FROM slider ORDER BY id ASC');
      const menQuery = await pool.query("SELECT * FROM products WHERE type='men-formal'");
      const womenQuery = await pool.query("SELECT * FROM products WHERE type='Saree'");
      const menCasualQuery = await pool.query("SELECT * FROM products WHERE type='Men Casual'");
      const shortKurtiQuery = await pool.query("SELECT * FROM products WHERE type='Short Kurti'");
      const lehangaQuery = await pool.query("SELECT * FROM products WHERE type='Lehanga'");
      const boxesQuery = await pool.query('SELECT * FROM boxes');
      const womenFormalQuery = await pool.query('SELECT * FROM WomenFormal');
      const exploreItemQuery = await pool.query('SELECT * FROM explore_items');

      res.render('index', {
        sliderData: sliderQuery.rows,
        men: menQuery.rows,
        Saree: womenQuery.rows,
        menCasual: menCasualQuery.rows,
        shortKurti: shortKurtiQuery.rows,
        Lehanga: lehangaQuery.rows,
        boxed: boxesQuery.rows,
        womenFormal: womenFormalQuery.rows,
        exploreItem: exploreItemQuery.rows,
      
      });
    } catch (error) {
      console.error('Error fetching home data:', error);
      res.status(500).send('Internal Server Error');
    }
  };

  // products  Page Controller
  exports.getStylePage = async (req, res) => {
    const type = req.params.type;
    try {
      const result = await pool.query("SELECT * FROM products WHERE type=$1", [type]);
      res.render('Product', { product: result.rows, type,tableName: 'products'  });
      
    } catch (error) {
      console.error('Error fetching style data:', error);
      res.status(500).send('Internal Server Error');
    }
  };

  // boxed file (See More Controller)
  exports.getSeeMore = async (req, res) => {
    const group_no = parseInt(req.params.group_no);
    try {
      const result = await pool.query('SELECT * FROM boxes WHERE group_no = $1', [group_no]);

      if (result.rows.length === 0) {
        return res.send('No products found for this group.');
      }

      const categoryTitle = result.rows[0].category_title;
      res.render('boxes', { products: result.rows, category: categoryTitle,tableName: 'boxes'  });
    } catch (error) {
      console.error('Error fetching see-more data:', error);
      res.status(500).send('Internal Server Error');
    }
  };

  // Explore Page Controller
  exports.getExplore = async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM womenformal');
      res.render('explore', { products: result.rows,tableName: 'womenformal'  });
    } catch (err) {
      console.error(err);
      res.send('Database Error');
    }
  };

  // Explore Item Page Controller
  exports.getExploreItem = async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM explore_items');
      res.render('explore-item', { products: result.rows ,tableName: 'explore-items' });
    } catch (err) {
      console.error(err);
      res.send('Database Error');
    }
  };
  exports.getMenCollectionPage = (req, res) => {
      res.render('menCollection');  // Ensure file name matches views/MenCollection.ejs
  };
  exports.getWomenCollectionPage = (req, res) => {
      res.render('womenCollection');  // Ensure file name matches views/MenCollection.ejs
  };
  exports.getTrendingCollectionPage = (req, res) => {
      res.render('Trending-fashion');  // Ensure file name matches views/MenCollection.ejs
  };
  exports.getNewArrivalPage = (req, res) => {
      res.render('newArrival');  
  };
  exports.getModernFashionPage = (req, res) => {
      res.render('Modern-Fashion');  
  };
  exports.getOfferPage = (req, res) => {
      res.render('offer');

  };



