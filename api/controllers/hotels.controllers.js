// Bring in the mongoose model for the hotels
var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

// Location query function.
var runGeoQuery = function(req, res) {
  var lng = parseFloat(req.query.lng);
  var lat = parseFloat(req.query.lat);

  // Check to make sure lng and lat are numbers
  if (isNaN(lng) || isNaN(lat)) {
    res
      .status(400)
      .json({
        "message": "If supplied in querystring, lng and lat should be numbers."
      });
    return;
  }

  // Create a geoJSON point
  var point = {
    type: "Point",
    coordinates: [lng, lat]
  };

  // Set options for the location search
  var geoOptions = {
    spherical: true,
    maxDistance: 2000,  // Units here is metres
    num : 5
  };

  Hotel
    .geoNear(point, geoOptions, function(err, results, stats) {
      var response = {
        status: 200,
        message: results
      };

      if (err) {
        console.log('Error finding hotels by location');
        response.status = 500;
        response.message = err;
      } else if (results.length === 0) {
        console.log('No nearby hotels found within ' + geoOptions.maxDistance +
          ' metres.');
      }

      console.log('Geo results', results);
      console.log('Geo stats', stats);

      // Return the response
      res
        .status(response.status)
        .json(response.message);

    });

};

// Controller to return all the hotel data.
module.exports.hotelsGetAll = function(req, res) {

  // Set defaults for paganation
  var offset = 0;
  var count = 5;
  var maxCount = 10;

  // Check for a location query string
  if (req.query && req.query.lat && req.query.lng) {
    runGeoQuery(req, res);
    return;
  }

  // Process any offset query string
  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }

  // Process any count query string
  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
  }

  // Make sure offset and count are numbers
  if (isNaN(offset) || isNaN(count)) {
    res
      .status(400)
      .json({
        "message": "If supplied in querystring, count and offset should be numbers."
      });
    return;
  }

  // Enforce the maximum number of hotels that can be returned through the API
  if (count > maxCount) {
    res
      .status(400)
      .json({
        "message": "Count limit of " + maxCount + " exceeded"
      });
    return;
  }

  // From the hotel Mongoose model, get the hotels according to any offset and
  // count query strings present in the requested URL.
  Hotel
    .find()
    .skip(offset)
    .limit(count)
    .exec(function(err, hotels) {
      if (err) {
        console.log("Error finding hotels");
        res
          .status(500)
          .json(err);
      } else {
        console.log('Found hotels', hotels.length);
        res
          .status(200)
          .json(hotels);
      }
    });

};

// Controller to return data on a singal hotel.
module.exports.hotelsGetOne = function(req, res) {

  // Get the URL parmater for the hotel ID.
  var hotelId = req.params.hotelId;

  console.log('GET hotelId', hotelId);

  // Return the data for the requested
  Hotel
    .findById(hotelId)
    .exec(function(err, doc) {
      var response = {
        status: 200,
        message: doc
      };
      if (err) {
        console.log("Error finding hotel");
        response.status = 500;
        response.message = err;
      } else if (!doc) {
        response.status = 404;
        response.message = {
          "message": "Hotel ID not found"
        };
      }

      // Return the response
      res
        .status(response.status)
        .json(response.message);
    });

};

// Helper function to covert ';' delimited string into an array, but return an
// empty array if the string is empty.
var _splitArray = function(input) {
  var output;
  if (input && input.length > 0) {
    output = input.split(';');
  } else {
    output = [];
  }
  return output;
};

// Controller to add a hotel
module.exports.hotelsAddOne = function(req, res) {

  Hotel
    .create({
      name: req.body.name,
      description: req.body.description,
      stars: parseInt(req.body.stars, 10),
      services: _splitArray(req.body.services),
      photos: _splitArray(req.body.photos),
      currency: req.body.currency,
      location: {
        address: req.body.address,
        coordinates: [parseFloat(req.body.lng), parseFloat(req.body.lat)]
      }
    }, function(err, hotel) {
      if (err) {
        console.log('Error creating hotel');
        res
          .status(400)
          .json(err);
      } else {
        console.log('Hotel created', hotel);
        res
          .status(201)
          .json(hotel);
      }
    });
};


module.exports.hotelsUpdateOne = function(req, res) {

  // Get the URL parmater for the hotel ID.
  var hotelId = req.params.hotelId;

  console.log('GET hotelId', hotelId);

  // Return the data for the requested
  Hotel
    .findById(hotelId)
    .select('-reviews -rooms')  // Exclude sub-documents from update
    .exec(function(err, doc) {
      var response = {
        status: 200,
        message: doc
      };
      if (err) {
        console.log("Error finding hotel");
        response.status = 500;
        response.message = err;
      } else if (!doc) {
        response.status = 404;
        response.message = {
          "message": "Hotel ID not found"
        };
      }

      if (response.status !== 200) {
        // Return response indicating an error has occurred
        res
          .status(response.status)
          .json(response.message);
      } else {
        doc.name = req.body.name;
        doc.description = req.body.description;
        doc.stars = parseInt(req.body.stars, 10);
        doc.services = _splitArray(req.body.services);
        doc.photos = _splitArray(req.body.photos);
        doc.currency = req.body.currency;
        doc.location = {
          address: req.body.address,
          coordinates: [parseFloat(req.body.lng), parseFloat(req.body.lat)]
        };

        doc.save(function(err, hotelUpdated) {
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


module.exports.hotelsDeleteOne = function(req, res) {
  // Etract the hotel ID from the request parameters
  var hotelId = req.params.hotelId;

  Hotel
    .findByIdAndRemove(hotelId)
    .exec(function(err, hotel) {
      if (err) {
        res
          .status(404)
          .json(err);
      } else {
        console.log('Hotel deleted, id:', hotelId);
        res
          .status(204)
          .json();
      }
    });
};
