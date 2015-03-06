var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/twerkday');

module.exports.userSchema = new mongoose.Schema({
    username: String,
    jobtitle: String,
    twerks: {type: Number, default: 0}
});