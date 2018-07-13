var Response = require('../models/reponse');
const bodyParser = require('body-parser');
exports.saveResponse = (req, res, next) => { 
    console.log('IN HERE');
    Response.create({
        id: req.body.id,
        response: req.body.response,
        user: req.body.user,
        csr: req.body.csr,
        lang: 'en',
        date: 'dsfsdf'
    }, (err, response) => {
        if (err) res.send(err);
        Response.find(function(err, responses) {
            if (err) res.send(err);
            res.json(responses);
        });
    });
}
exports.getResponses = (req, res, next) => { 
    Response
    .find({ csr: req.params.user })
    .sort({ createdAt: -1})
    .limit(10)
    .exec(function(err, result) {
        if (err) throw err;
        res.json(result);
    });
}