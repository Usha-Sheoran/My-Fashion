
const express = require('express');
const router = express.Router();
const indexController = require('../Controller/indexController');

router.get('/logout', indexController.logoutUser)
router.get('/login', indexController.getLoginPage);




// Home Page
router.get('/', indexController.getHomePage);

// Style Page
router.get('/style/:type', indexController.getStylePage);

// See More Page
router.get('/see-more/:group_no', indexController.getSeeMore);

// Explore Page
router.get('/explore', indexController.getExplore);

// Explore Item Page
router.get('/explore-item', indexController.getExploreItem);
router.get('/MenCollection', indexController.getMenCollectionPage);
router.get('/WomenCollection', indexController.getWomenCollectionPage);
router.get('/Trending-fashion', indexController.getTrendingCollectionPage);
router.get('/ModernFashion', indexController.getModernFashionPage);
router.get('/newArrival', indexController.getNewArrivalPage);
router.get('/offer', indexController.getOfferPage);




module.exports = router;
