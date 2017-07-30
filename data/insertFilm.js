//Dependencies.
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var http = require('http');
// var mongoUri = 'mongodb://localhost:27017/filmapp';
var mongoURI = 'mongodb://<dbuser>:<dbpassword>@ds129143.mlab.com:29143/film-app';


var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

//Film Data & Data Storage.


var Schema = mongoose.Schema;

var filmSchema = new Schema({
   title       : {type: String, min: 8, max: 50, required: true},
   overview    : {type: String, required: true},
   poster      : {type: String, min: 3, max: 50},
   releaseDate : {type: Date, default: Date.now}
});

var Film = mongoose.model('Film', filmSchema);

//Routes.

// GET Film!

// app.get('/api/blogs', function(req, res) {
//     Blog.find(function (err, blogs) {
//         if (err)
//             res.send(err);
//         res.json(blogs);
//     });
// });

// POST Film!

app.post('/#/search', function(req, res) {
    Film.create({
        title: req.body.title,
        overview: req.body.info,
        poster: req.body.poster,
        releaseDate: req.body.date
    }, function(err, film) {
        if (err)
            res.send(err);
        Film.find(function(err, blogs) {
            if (err)
                res.send(err);
            res.json(films);
        });
    });
});