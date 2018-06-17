const bodyParser = require('body-parser');
const User = require('../models/user');

exports.getProfile = (req, res, next) => { 
    User.findOne({ email: req.params.user })
    .exec(function(err, result) {
        if (err) throw err;
        res.json(result);
    });
}

exports.updateProfile = (req, res, next) => { 
    console.log('m: ' + req.body);
    console.log(JSON.stringify(req.body));
    User.update({ email: req.body.email }, 
    { 
        firstName: req.body.fname, 
        lastName: req.body.lname,
        email: req.body.email,
        role: req.body.role
        }, 
        {}, 
        (err, docs) => {
            if (err) console.log(err);
            res.send('successfully updated: ' + docs);
        })
}
