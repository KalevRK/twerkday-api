var db = require('../dbConfig');
var mongoose = require('mongoose');

var User = mongoose.model('user', db.userSchema);

module.exports = User;