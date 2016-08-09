// Connect to the MongoDB database using Mongoose
var mongoose = require('mongoose');
var dburl = 'mongodb://localhost:27017/meanhotel';

// Make the connection
mongoose.connect(dburl);

// Listen for when the connection is actually made
mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to ' + dburl);
});

// Listen for when the connection is broken
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected');
});

// Listen for any errors with the connection
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connected error: ' + err);
});

// Listen for when the NodeJS app with shutdown with Ctrl-C and close the
// connection to the database
process.on('SIGINT', function() {
  mongoose.connection.close(function() {
    console.log('Mongoose disconnected through app termination (SIGINT)');
    process.exit(0);
  });
});

process.on('SIGTERM', function() {
  mongoose.connection.close(function() {
    console.log('Mongoose disconnected through app termination (SIGTERM)');
    process.exit(0);
  });
});

// Listen for when Nodemon restarts the NodeJS app and reissue the signal
// once the connection is closed.
process.once('SIGUSR2', function() {
  mongoose.connection.close(function() {
    console.log('Mongoose disconnected through app termination (SIGUSR2)');
    process.kill(process.pid, 'SIGUSR2');
  });
});

// Bring in schema and models
require('./hotels.model.js');
require('./users.model.js');
