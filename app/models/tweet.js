var mongoose = require('mongoose');
var TweetSchema = new mongoose.Schema({
    id: String,
    text: String,
    lang: String,
    userId: Number,
    user: String,
    friends: Number,
    followers: Number,
    date: String,
    score: Number,
    magnitude: Number,
    csr: String,
    avatar: String,
    time : { type : Date, default: '2018-09-03T23:44:49.850Z'}
},{
    timestamps: true
});
module.exports = mongoose.model('Tweet', TweetSchema);