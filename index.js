var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
 
var databaseConfig = require('./app/config/database');
var router = require('./app/routes');
 
mongoose.connect(databaseConfig.url);
 
app.listen(process.env.PORT || 8090);
console.log("App listening on port 8090");
 
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses
app.use(logger('dev')); // Log requests to API using morgan
  
router(app);