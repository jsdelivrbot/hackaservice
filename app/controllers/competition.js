var Tweet = require('../models/tweet');
const bodyParser = require('body-parser');
exports.getTweets = (req, res, next) => { 
    Tweets.find()
    .exec(function(err, result) {
        if (err) throw err;
        res.json(result);
    });
}