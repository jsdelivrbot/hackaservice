var mongoose = require('mongoose');
var ResponseSchema = new mongoose.Schema({
    id: String,
    response: String,
    lang: String,
    user: String,
    csr: String,
    date: String
},{
    timestamps: true
});
module.exports = mongoose.model('Response', ResponseSchema);