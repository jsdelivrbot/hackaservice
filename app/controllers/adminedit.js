const User = require('../models/user');
const bodyParser = require('body-parser');

exports.getUsers = (req, res, next) => {
	User.find({}).sort({ "lastName": "asc" }).exec(function(err, result) {
        if (err) throw err;
        res.json(result);
    });
}

exports.deleteUser = (req, res, next) => {
	User.deleteOne({ email: req.body.email }).exec(function (err) {
		if (err) throw err;
		res.send('successfully deleted: ');
	});
}

exports.addUser = (req, res, next) => {
	var user = new User ({
		email: req.body.email,
		firstName: req.body.fName,
		lastName: req.body.lName,
		password: req.body.password,
		role: req.body.role,
		lang: req.body.lang
	});
	user.save(function (err) {
		if (err) throw err;
		res.send('successfully added: ');
	});
}