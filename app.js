var express = require('express');
var app = express();
var path = require('path');

// Define the port to run on
app.set('port', 3000);

// Define a route for the homepage
app.get('/', function(req, res) {
  console.log('GET the homepage');
  res
    .status(200)
    .sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Define a route for some JSON data
app.get('/json', function(req, res) {
  console.log('GET the json');
  res
    .status(200)
    .json({ "jsonData": true });
});

// Define a route for sending a file
app.get('/file', function(req, res) {
  console.log('GET the file');
  res
    .status(200)
    .sendFile(path.join(__dirname, 'app.js'));
});

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});

