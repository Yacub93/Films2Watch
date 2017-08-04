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

app.post('/search', function (req, res) {

	console.log(req.body);

	   Film.collection.insert(req.body, function (err, docs) {
        console.log(docs);
        res.json(docs);
    });

});

	// var addFilm = new Film(req.body);

	// addFilm.save(function (err) {
		
	// 	if (err) 
	// 	{
	// 		console.log(err);
	// 	}
	// 	console.log(res.json);
	// 	res.json(addFilm);
	// });

    // Film.collection.insert(req.body, function (err, docs) {
    //     console.log(docs);
    //     res.json(docs);
    // });


  //   var film1 = {
  //       title    : "Spiderman: Homecoming",
  // 		poster   : "http://image.tmdb.org/t/p/w185/c24sv2weTHPsmDa7jEMN0m2P3RT.jpg",
  // 		overview : "Spiderman new film",
  // 		genres   : "Action,Adventure,Science Fiction",
  // 		release  : '2017/07/01'
  //   };

  //   var film2 = {
  //       title    : "Beauty and the Beast",
  // 		poster   : "http://image.tmdb.org/t/p/w185/tWqifoYuwLETmmasnGHO7xBjEtt.jpg",
  // 		overview : "Disney new film",
  // 		genres   : "Family,Fantasy,Romance",
  // 		release  : '2017/02/01'
  //   };

  // var chosenFilm = [film1,film2];
  // res.json(chosenFilm);



var port = 3000; //port number

app.listen(port, function () {
	console.log("Server running on port " + port);

});
