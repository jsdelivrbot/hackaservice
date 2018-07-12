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
    console.log('god damn');
    console.log(JSON.stringify(req.body.user));
    console.log(JSON.stringify(req.body));
    User.update({ email: req.body.user.email }, 
    { 
        firstName: req.body.user.fName, 
        lastName: req.body.user.lName,
        email: req.body.user.email,
        lang: req.body.user.lang,
        role: req.body.user.role
    }, 
    {}, 
    (err) => {
        if (err) console.log(err);
        res.send('successfully updated: ');
    })
}
