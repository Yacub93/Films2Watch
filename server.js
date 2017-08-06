var express    = require('express');
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');
var cors       = require('cors');
var con        = require('./connection');
var model      = require('./model');


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

// UPDATE Films!
app.put('/watch-list/:id/:isMarked', function(req, res) {

		var filmId = req.params.id;
		var isMarked = req.params.isMarked;
		console.log(filmId);
		console.log(isMarked);

		// var condition = {'_id': mongoose.Types.ObjectId(filmId)};
		// var update    = {'$set': isMarked};
	 //    var options   = {'new': true};

Film.findById(filmId, function (err, film) {  
    // Handle any possible database errors
    if (err) {
        res.status(500).send(err);
    } else {
        // Update each attribute with any possible attribute that may have been submitted in the body of the request
        // If that attribute isn't in the request body, default back to whatever it was before.
        film.marked = req.params.isMarked || film.marked;

        // Save the updated document back to the database
        film.save(function (err, film) {
            if (err) {
                res.status(500).send(err)
            }
            res.send(film);
        });
    }
});

});

		// var filmId = req.params.id;
		// var isMarked = req.params.marked;
		// console.log(filmId);
		// console.log(isMarked);

	// Film.collection.updateOneupdate({'marked':'MongoDB Overview'},{$set:{'marked':'New MongoDB Tutorial'}}, function (err, docs) {
 //        console.log(docs);
 //        res.json(docs);
 //    });


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
