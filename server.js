"use strict";
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Bear = require('./app/models/bears');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 8080;
mongoose.connect('mongodb://admin:admin@ds011903.mlab.com:11903/dabears');
var router = express.Router();
router.use(function (req, res, next) {
    console.log('Something is happening.');
    next();
});
router.get('/', function (req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});
router.route('/bears')
    .post(function (req, res) {
    var bear = new Bear();
    bear.name = req.body.name;
    bear.save(function (err) {
        if (err)
            res.send(err);
        res.json({ message: 'Bear created!' });
    });
});
app.use('/api', router);
app.listen(port);
console.log("Magic happens on port " + port);
