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
      var response = {
        status: 200,
        message: {}
      };

      if (err) {
        console.log('Error finding hotel reviews');
        response.status = 500;
        response.message = err;
      } else if (!doc) {
        response.status = 404;
        response.message = {
          "message": "Hotel ID not found"
        };
      } else {
        response.message = doc.reviews;
      }

      console.log('Returned doc', doc);

      // Return the response
      res
        .status(response.status)
        .json(response.message);
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
      var response = {
        status: 200,
        message: {}
      };

      if (err) {
        console.log('Error finding hotel');
        response.status = 500;
        response.message = err;
      } else if (!hotel) {
        console.log("Hotel id not found in database", id);
        response.status = 404;
        response.message = {
          "message": "Hotel ID not found " + id
        };
      } else {
        response.message = hotel.reviews.id(reviewId);
        if (response.message === null) {
          response.status = 404;
          response.message = {
            "message": "Hotel Review ID not found " + reviewId
          };
        }
      }

      // Return the response
      res
        .status(response.status)
        .json(response.message);
    });

};