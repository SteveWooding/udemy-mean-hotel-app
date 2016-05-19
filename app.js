var express = require('express');
var app = express();

// Define the port to run on
app.set('port', 3000);

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});

