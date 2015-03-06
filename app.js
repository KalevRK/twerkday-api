var express = require('express');
var db = require('./dbConfig.js');

var app = express();
var port = 5309;

app.get('/', function (req, res) {
  res.send('This is a server response.');
});

app.listen(port);
console.log ('Server now listening on port ' + port);

module.exports = app;