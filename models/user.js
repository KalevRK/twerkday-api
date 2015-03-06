var db = require('../dbConfig');
var mongoose = require('mongoose');

var User = mongoose.model('User', db.userSchema);

module.exports = User;