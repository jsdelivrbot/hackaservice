var Tweet = require('../models/tweet');
const bodyParser = require('body-parser');
var Twit = require('twit');
const Heroku = require('heroku-client')
const heroku = new Heroku({ token: process.env.HEROKU_API_TOKEN })
const T = new Twit({
    consumer_key:         process.env.consumer_key,
    consumer_secret:      process.env.consumer_secret,
    access_token:         process.env.access_token,
    access_token_secret:  process.env.access_token_secret,
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
});
exports.changeHandles = (req, res, next) => { 
    console.log('test4');
    var data = "";
    req.on('data', function(chunk){ data += chunk })
    req.on('end', function(){
        heroku.patch('/apps/tweettwester/config-vars', { body: { handlesToCheck: data }}).then(app => {
            console.log('we gud?');
        })
        res.send('we gud4?');
    })
}
exports.postTweet = (req, res, next) => { 
    T.post('statuses/update', 
        { 
          status: '@' + req.body.user + ' ' + req.body.text, 
          in_reply_to_status_id: req.body.in_reply_to
        }, 
        function(error, tweet, response) {
            if (!error) console.log(error);
            res.json(response);
        }
    );
}
exports.getTweetsByUser = function(req, res, next){
    Tweet
    .find({ user: req.params.user })
    .sort({time: -1})
    .limit(10)
    .exec(function(err, result) {
        if (err) throw err;
        res.json(result);
    }); 
}
exports.getTweets = function(req, res, next){
    Tweet
    .find()
    .sort({time: -1})
    .limit(10)
    .exec(function(err, result) {
        if (err) throw err;
        res.json(result);
    }); 
}
exports.getGoodTweets = function(req, res, next){
    Tweet
    .find({ score: { $gt: 0 }, csr: null, lang: req.params.lang })
    .sort({time: -1})
    .limit(Number(req.params.number))
    .exec(function(err, result) {
        if (err) throw err;
        res.json(result);
    }); 
}
exports.getBadTweets = function(req, res, next){
    Tweet
    .find({ score: { $lt: 0 }, csr: null, lang: req.params.lang  })
    .sort({time: -1})
    .limit(Number(req.params.number))
    .exec(function(err, result) {
        if (err) throw err;
        res.json(result);
    }); 
}
exports.getSpecificTweets = (req, res) => {
    Tweet
    .find({"csr":null})
    .sort({time: -1})
    .limit(Number(req.params.number))
    .exec(function(err, result) {
        if (err) throw err;
        res.json(result) 
    });
}
exports.getTweetById = function(req, res, next){
    Tweet.findOne({ id: Number(req.params.id) }, function(err, result) {
        if (err) throw err;
        res.json(result) 
    }); 
}
exports.getMyTweets = function(req, res, next){
    console.log('asdasd: ' + req.params.user);
    Tweet
    .find({ csr: req.params.user })
    .limit()
    .exec(function(err, result) {
        if (err) throw err;
        res.json(result) 
    });
}
exports.claimTweet = function(req, res, next){
    Tweet
    .findByIdAndUpdate(
    req.params.tweet, 
    { $set: { csr: req.body.user }}, 
    {}, 
    function (err, doc) {
        if (err) throw err;
        else res.json(doc);
    });
}