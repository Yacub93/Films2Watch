var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/filmsdb";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.collection("filmsList").drop(function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("Table deleted");
    db.close();
  });
});