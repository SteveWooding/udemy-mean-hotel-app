var dbconn = require('../data/dbconnection.js');
var ObjectId = require('mongodb').ObjectId;

// Bring some hard coded temporary data
var hotelData = require('../data/hotel-data.json');

// Controller to return all the hotel data.
module.exports.hotelsGetAll = function(req, res) {

  // Get the database connection
  var db = dbconn.get();
  var collection = db.collection('hotels');

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

  // From the database collection, get the hotels according to any offset and
  // count query strings present in the requested URL.
  collection
    .find()
    .skip(offset)
    .limit(count)
    .toArray(function(err, docs) {
      console.log('Found hotels', docs);
      res
        .status(200)
        .json(docs);
    });

};

// Controller to return data on a singal hotel.
module.exports.hotelsGetOne = function(req, res) {

  // Get the database connection
  var db = dbconn.get();
  var collection = db.collection('hotels');

  // Get the URL parmater for the hotel ID.
  var hotelId = req.params.hotelId;

  console.log('GET hotelId', hotelId);

  // Return the data for the requested
  collection
    .findOne({
      _id : ObjectId(hotelId)
    }, function(err, doc) {
      res
        .status(200)
        .json(doc);
    });

};

// Controller to add a hotel
module.exports.hotelsAddOne = function(req, res) {

  // Get the database connection
  var db = dbconn.get();
  console.log('db', db);

  console.log('POST new hotel');
  console.log(req.body);
  res
    .status(200)
    .json(req.body);
};