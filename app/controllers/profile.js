const bodyParser = require('body-parser');
const User = require('../models/user');

exports.getProfile = (req, res, next) => { 
    User.find({ user: req.params.user }
        .exec(function(err, result) {
            if (err) throw err;
            res.json(result);
        })
    );
}
