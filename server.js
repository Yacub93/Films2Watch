var express  = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var con      = require('./connection');
var model    = require('./model');


var Film = mongoose.model('film', model, 'film_list');

mongoose.connect(con.connectionString);

var app = express();
app.use(bodyParser.json());
// Use express on public directory files
app.use(express.static(__dirname + '/public'));

// app.use('/node_modules',express.static(__dirname + '/node_modules'));
// Routes.

// GET Films!

app.get('/watch-list', function(req, res) {

	Film.find(function (err, docs) {
		
		if (err) 
		{
			console.log(err);
		}
		res.json(docs);
	});

});

// DELETE Films!
app.delete('/watch-list/:id', function (req, res) {
		var filmId = req.params.id;
		console.log(filmId);

	Film.collection.remove({'_id': mongoose.Types.ObjectId(filmId)}, function (err, docs) {
        console.log(docs);
        res.json(docs);
    });

});

// POST Films!
app.post('/search', function (req, res) {

	console.log(req.body);

	   Film.collection.insert(req.body, function (err, docs) {
        console.log(docs);
        res.json(docs);
    });

});

var port = 3000; //port number

app.listen(port, function () {
	console.log("Server running on port " + port);

});
