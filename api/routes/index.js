var express = require('express');
var router = express.Router();

var ctrlHotels = require('../controllers/hotels.controllers.js');

// Route to get all hotels
router
  .route('/hotels')
  .get(ctrlHotels.hotelsGetAll);

// Route to get one hotel by its ID.
router
  .route('/hotels/:hotelId')
  .get(ctrlHotels.hotelsGetOne);

// Route to add a hotel
router
  .route('/hotels/new')
  .post(ctrlHotels.hotelsAddOne);

module.exports = router;