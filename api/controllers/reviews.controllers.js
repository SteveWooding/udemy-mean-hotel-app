// Bring in the mongoose model for the hotels
var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

// GET all reviews for a hotel
module.exports.reviewsGetAll = function(req, res) {
  // Get the URL parmater for the hotel ID.
  var hotelId = req.params.hotelId;

  console.log('GET hotelId', hotelId);

  // Return the reviews for the requested hotel
  Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, doc) {
      console.log('Returned doc', doc);
      res
        .status(200)
        .json(doc.reviews);
    });
};

// GET single review for a hotel
module.exports.reviewsGetOne = function(req, res) {
  // Get the URL parmater for the hotel and review IDs.
  var hotelId = req.params.hotelId;
  var reviewId = req.params.reviewId;
  console.log('GET reviewId ' + reviewId + ' for hotelId ' + hotelId);

  Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, hotel) {
      console.log('Returned doc', hotel);
      var review = hotel.reviews.id(reviewId);
      res
        .status(200)
        .json(review);
    });

};