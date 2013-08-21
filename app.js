
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var movie = require('./routes/movie');
var http = require('http');
var path = require('path');
var fs = require('fs');

var app = express();

// all environments
app.set('port', process.env.PORT || 80);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.compress()); // gzip
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// check if movies template generated
fs.exists("public/movies.html", function (exists) {
  if (!exists) {
    var movieMod = require('./movies/moviesMod.js');
    movieMod.run();
  }
});

// check if user database generated
fs.exists("movies/users.dat", function (exists) {
  if (!exists) {
    fs.writeFile("movies/users.dat", "");
  }
});

// check if user-rating database generated
fs.exists("movies/ratings.dat", function (exists) {
  if (!exists) {
    fs.writeFile("movies/ratings.dat", "");
  }
});

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/user/:office?/:name', user.read);
app.get('/movies/:name', movie.getRate);
app.post('/movies/:name', movie.setRate);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
