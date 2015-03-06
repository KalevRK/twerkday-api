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

// GET all users
app.get('/api/users', function (req, res) {
    return User.find(function (err, users) {
        if (err) {
            console.error(err);
        }

        return res.send(users);
    })
});

// POST a new user
app.post('/api/users', function (req, res) {

    console.log('req.body: ', req.body);
    console.log('req.body.username: ', req.body.username);

    var user = new User({
        username: req.body.username,
        jobtitle: req.body.jobtitle
    });

    user.save( function (err) {
        if (err) {
            return console.error(err); 
        } else {
            return console.log('created new user');
        }
    });

    return res.send(user);
});



app.listen(port);
console.log ('Server now listening on port ' + port);