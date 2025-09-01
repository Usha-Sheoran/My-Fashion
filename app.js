const express = require('express');
const app = express();
const pool=require('./db')
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
app.use(bodyParser.urlencoded({ extended: true }));  
app.use(express.json());                          



const indexRouter = require('./Routes/indexRoutes');
const AuthRouter=require('./Routes/authRoutes');
const AddToCartRouter=require('./Routes/AddToCartRoutes');
const cartRouter=require('./Routes/cartRoutes');

app.set('view engine', 'ejs');
app.use(express.static('public'));



app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
}));

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

app.use((req, res, next) => {
  if (!res.locals.tableName) {
    res.locals.tableName = 'products'; // default value
  }
  next();
});

app.use(async (req, res, next) => {
  try {
    if (req.session.user) {
      const userId = req.session.user.id;

      // Database se cart items count
      const result = await pool.query(
        `SELECT COUNT(*) AS count FROM cart WHERE user_id = $1`,
        [userId]
      );

      res.locals.cartCount = result.rows[0].count;  // DB ka count
    } else {
      res.locals.cartCount = 0;  // Agar login hi nahi h
    }
    next();
  } catch (err) {
    console.error("Cart count middleware error:", err);
    res.locals.cartCount = 0;
    next();
  }
});


app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
});



app.use('/', indexRouter);
app.use('/',AuthRouter)
app.use('/',AddToCartRouter)
app.use('/',cartRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
