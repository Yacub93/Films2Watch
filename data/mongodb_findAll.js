var http = require('http');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/filmsdb";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.collection("filmsList").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result); //return all
    db.close();
  });
});