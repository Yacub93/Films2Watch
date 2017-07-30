var express = require('express');

var app = express();
// Use express on public directory files
app.use(express.static(__dirname + '/public'));

// app.use('/node_modules',express.static(__dirname + '/node_modules'));
//Routes.

// GET Film!

app.get('/', function(req, res) {

	res.send('Hello, express!');

});

app.get('/add', function(req, res) {

	res.send('Add, express!');

});

var port = 3000; //port number

app.listen(port, function () {
	console.log("Server running on port " + port);

});
