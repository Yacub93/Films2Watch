var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/film_db";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.createCollection("filmList", function(err, res) {
    if (err) throw err;
    console.log("Table FilmList created!");
    db.close();
  });
});