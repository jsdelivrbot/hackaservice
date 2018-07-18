var Competition = require('../models/competition');
const bodyParser = require('body-parser');
exports.getTweets = (req, res, next) => { 
    Competition.find()
    .exec(function(err, result) {
        if (err) throw err;
        res.json(result);
    });
}