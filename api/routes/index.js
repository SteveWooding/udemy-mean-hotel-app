var express = require('express');
var router = express.Router();

var ctrlHotels = require('../controllers/hotels.controllers.js');
var ctrlReviews = require('../controllers/reviews.controllers.js');

// Route to get all hotels and post a new hotel.
router
  .route('/hotels')
  .get(ctrlHotels.hotelsGetAll)
  .post(ctrlHotels.hotelsAddOne);

// Route to get one hotel by its ID.
router
  .route('/hotels/:hotelId')
  .get(ctrlHotels.hotelsGetOne)
  .put(ctrlHotels.hotelsUpdateOne);

// Route to all the reviews for a particular hotel
router
  .route('/hotels/:hotelId/reviews')
  .get(ctrlReviews.reviewsGetAll)
  .post(ctrlReviews.reviewsAddOne);

// Route to a single review for a particular hotel
router
  .route('/hotels/:hotelId/reviews/:reviewId')
  .get(ctrlReviews.reviewsGetOne)
  .put(ctrlReviews.reviewsUpdateOne);

module.exports = router;