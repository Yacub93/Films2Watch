var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/film-app";


MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var filmobj = { 
            title    : "Spiderman: Homecoming",
  				  poster   : "c24sv2weTHPsmDa7jEMN0m2P3RT.jpg",
  			    overview : "Spiderman new film",
  			    genre    : "Action,Adventure,Science Fiction",
  			    date     : '2017/07/01'
  			  };
  db.collection("filmsList").insertOne(filmobj, function(err, res) {
    if (err) throw err;
    console.log("1 record inserted");
    db.close();
  });
});