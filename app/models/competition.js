var mongoose = require('mongoose');
var CompetitionSchema = new mongoose.Schema({
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
    avatar: String
},{
    timestamps: true
});
module.exports = mongoose.model('Competition', CompetitionSchema);