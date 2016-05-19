var express = require('express');
var app = express();
var path = require('path');

// Import routes directory
var routes = require('./routes');

// Define the port to run on
app.set('port', 3000);

// Define some middleware to log requests. Order of app.use() calls matters.
app.use(function(req, res, next) {
  console.log(req.method, req.url);
  next();
});

// Define where the static files are located. An example of middleware.
app.use(express.static(path.join(__dirname, 'public')));

// Use routes as defined in the routes sub-directory for /api urls.
app.use('/api', routes);

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});

