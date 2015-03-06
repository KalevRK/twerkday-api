var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var db = require('./dbConfig.js');
var User = require('./models/user');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

var port = 5309;

app.get('/', function (req, res) {
  res.send('This is a server response.');
});

// Retrieve all users
app.get('/api/users', function (req, res) {
    User.find(function (err, users) {
        if (err) {
            res.send(err);
        }
        res.send(users);
    })
});

// Retrieve a single user
app.get('/api/users/:user_id', function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err) {
            res.send(err);
        }
        
        res.send(user);
    })
});

// Create a new user
app.post('/api/users', function (req, res) {

    var user = new User({
        username: req.body.username,
        jobtitle: req.body.jobtitle
    });

    user.save( function (err) {
        if (err) {
            res.send(err);
        } else {
            return console.log('created new user');
        }
    });

    res.send(user);
});

// Update an existing user's twerk count
app.put('/api/users/:user_id', function(req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err) {
            cres.send(err);
        }

        user.twerks = req.body.twerks;
        user.save( function (err) {
          if (err) {
            res.send(err);
          } else {
            return console.log('updated twerk count for user');
          }
        });
    });
});

// Remove a user
app.delete('/api/users/:user_id', function(req, res) {
    User.remove({ _id: req.params.user_id }, function(err, user) {
        if (err) {
            res.send(err);
        }
        return console.log('removed user');
    });
});

app.listen(port);
console.log ('Server now listening on port ' + port);