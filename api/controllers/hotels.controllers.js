// Bring some hard coded temporary data
var hotelData = require('../data/hotel-data.json');

// Controller to return all the hotel data.
module.exports.hotelsGetAll = function(req, res) {
  console.log('GET the hotels');
  res
    .status(200)
    .json(hotelData);
};