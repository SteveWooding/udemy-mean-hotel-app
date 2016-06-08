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

// Add a review to a hotel
var _addReview = function(req, res, hotel) {

  // Add a review on to the reviews array
  hotel.reviews.push({
    name: req.body.name,
    rating: parseInt(req.body.rating, 10),
    review: req.body.review
  });

  // Save the hotel back to the database
  hotel.save(function(err, hotelUpdated) {
    if (err) {
      res
        .status(500)
        .json(err);
    } else {
      // If no errors, return just the new review as feedback to the user.
      res
        .status(201)
        .json(hotelUpdated.reviews[hotelUpdated.reviews.length - 1]);
    }
  });

};

module.exports.reviewsAddOne = function(req, res) {
  // Get the URL parmater for the hotel ID.
  var hotelId = req.params.hotelId;

  console.log('POST hotelId', hotelId);

  Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, doc) {
      var response = {
        status: 200,
        message: {}
      };

      if (err) {
        console.log('Error finding hotel');
        response.status = 500;
        response.message = err;
      } else if (!doc) {
        console.log('Hotel id not found in database', id);
        response.status = 404;
        response.message = {
          "message": "Hotel ID not found " + id
        };
      } else {
        response.message = doc.reviews ? doc.reviews : [];
      }

      console.log('Returned doc', doc);

      if (doc) {
        _addReview(req, res, doc);
      } else {
        // Return the response
        res
          .status(response.status)
          .json(response.message);
      }

    });
};


module.exports.reviewsUpdateOne = function(req, res) {
  // Get the URL parmater for the hotel and review IDs.
  var hotelId = req.params.hotelId;
  var reviewId = req.params.reviewId;
  console.log('GET reviewId ' + reviewId + ' for hotelId ' + hotelId);

  Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, hotel) {
      var review;
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
        review = hotel.reviews.id(reviewId);
        if (review === null) {
          response.status = 404;
          response.message = {
            "message": "Hotel Review ID not found " + reviewId
          };
        }
      }

      if (response.status !== 200) {
        // Return the response
        res
          .status(response.status)
          .json(response.message);
      } else {
        // Assign new values to the review subdocument
        review.name = req.body.name;
        review.rating = parseInt(req.body.rating, 10);
        review.review = req.body.review;

        // Save the hotel document
        hotel.save(function(err, hotelUpdated) {
          if (err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json();
          }
        });
      }
    });
};


module.exports.reviewsDeleteOne = function(req, res) {
  // Get the URL parmater for the hotel and review IDs.
  var hotelId = req.params.hotelId;
  var reviewId = req.params.reviewId;
  console.log('GET reviewId ' + reviewId + ' for hotelId ' + hotelId);

  Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, hotel) {
      var review;
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
        review = hotel.reviews.id(reviewId);
        if (review === null) {
          response.status = 404;
          response.message = {
            "message": "Hotel Review ID not found " + reviewId
          };
        }
      }

      if (response.status !== 200) {
        // Return the response
        res
          .status(response.status)
          .json(response.message);
      } else {
        // Remove the review subdocument
        hotel.reviews.id(reviewId).remove();

        // Save the hotel document
        hotel.save(function(err, hotelUpdated) {
          if (err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json();
          }
        });
      }
    });
};