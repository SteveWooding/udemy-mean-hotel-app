var mongoose = require('mongoose');

// Define a schema for the reviews (will be a sub-document of hotel schema)
var reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: true
  },
  review: {
    type: String,
    required: true
  },
  createOn: {
    type: Date,
    default: Date.now
  }
});

var roomSchema = new mongoose.Schema({
  type: String,
  number: Number,
  description: String,
  photos: [String],
  price: Number
});

// Define a schmea for a hotel in the database
var hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  stars: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  description: String,
  photos: [String],
  currency: String,
  services: [String],
  reviews: [reviewSchema],
  rooms: [roomSchema],
  location: {
    address: String,
    coordinates: {
      // Always store coordinates longitude (E/W), latitude (N/S) order
      type: [Number],
      index: '2dsphere'  // Helps Mongo search coordinates for nearby hotels
    }
  }
});

// Compile the model (called 'Hotel') from the above schema
mongoose.model('Hotel', hotelSchema);