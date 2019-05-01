var express = require('express'),
    mongoose = require('mongoose'),
    secrets = require('./config/secrets');
// Connect to a MongoDB

module.exports = function () {
    mongoose.connect(secrets.mongo_connection, { useNewUrlParser: true });
    var db = mongoose.connection;
    db.once('open', function callback() {
        console.log('MongoDB database connected!');
    });
}