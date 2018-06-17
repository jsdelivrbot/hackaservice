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
    User.update({ email: req.body.user }, 
    { 
        firstName: req.body.fname, 
        lastName: req.body.lname,
        email: req.body.user,
        role: req.body.role
        }, 
        {}, 
        () => {
            res.send('successfully updated');
        })
}
