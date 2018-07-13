var Threat = require('../models/threat');

exports.getThreats = function(req, res, next) {
    Threat
    .find({})
    .sort({id: -1})
    .limit(50)
    .exec(function(err, result) {
        if (err) throw err;
        res.json(result);
    }); 
}