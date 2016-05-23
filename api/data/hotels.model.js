var mongoose = require('mongoose');

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
  services: [String]
});

// Compile the model (called 'Hotel') from the above schema
mongoose.model('Hotel', hotelSchema);