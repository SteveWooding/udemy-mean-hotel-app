// Bring some hard coded temporary data
var hotelData = require('../data/hotel-data.json');

// Controller to return all the hotel data.
module.exports.hotelsGetAll = function(req, res) {
  console.log('GET the hotels');
  console.log(req.query);

  // Set defaults for paganation
  var offset = 0;
  var count = 5;

  // Process any offset query string
  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }

  // Process any count query string
  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
  }

  // Extract the requested data
  var returnData = hotelData.slice(offset, offset + count);

  // Define the response
  res
    .status(200)
    .json(returnData);
};

// Controller to return data on a singal hotel.
module.exports.hotelsGetOne = function(req, res) {
  // Get the URL parmater for the hotel ID.
  var hotelId = req.params.hotelId;

  // Get the request hotel data
  var thisHotel = hotelData[hotelId];

  // Return hotel data
  console.log('GET hotelId', hotelId);
  res
    .status(200)
    .json(thisHotel);
};