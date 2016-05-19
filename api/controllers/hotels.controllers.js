// Bring some hard coded temporary data
var hotelData = require('../data/hotel-data.json');

// Controller to return all the hotel data.
module.exports.hotelsGetAll = function(req, res) {
  console.log('GET the hotels');
  res
    .status(200)
    .json(hotelData);
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