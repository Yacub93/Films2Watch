var env = process.env.NODE_ENV || 'dev';
var con = '';

if (env==='dev') {
	con = 'mongodb://localhost:27017/filmapp';
} else {
   con = 'mongodb://Yacub93:Yacub1993Ali@ds129143.mlab.com:29143/film-app';
}

console.log(con);
exports.connectionString = con;
// exports.connectionString = 'mongodb://localhost:27017/filmapp';
// exports.connectionString = 'mongodb://Yacub93:Yacub1993Ali@ds129143.mlab.com:29143/film-app';