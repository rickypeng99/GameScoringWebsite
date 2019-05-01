
var mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser');

const path = require("path")
// Create our Express application
var app = express();

var port = process.env.PORT || 5000;

// Allow CORS so that backend and frontend could be put on different servers

var allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, authorization");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
    // "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, authorization"
};


app.use(express.static(__dirname + '/public'));
app.use(allowCrossDomain);

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client", "build")))

require('./routes/')(app);
// Connect to mongodb
require('./db/db.js')();


app.listen(port);

console.log('Server running on port ' + port);
