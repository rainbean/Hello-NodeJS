/* 
 * Generate Movie Database JSON file
 */
exports.run = function() {
  var fs = require('fs');
  var lineReader = require('line-reader');
  var S = require('string');

  fs.exists("movies/movies.dat", function (exists) {
    if (!exists) {
      console.log('Movies.dat database not found.');
      process.exit(1);
    }
  });

  var db = { name: 'movies-database', version: 1, aaData: [] };

/***
 Rules   <- A | B 
 Sample  <- 1::Toy Story (1995)::Animation|Children's|Comedy
  A <- /::/  match "::"
  B <- /\((\d+)\)/  match "(1995)"
 Result  <- '1' 'undefined' 'Toy Story ' '1995' '' 'undefined' 'Animation|Children's|Comedy'
 ***/
  lineReader.eachLine('movies/movies.dat', function(line, last) {
    //console.log(line);
    var arr = line.split(/::|\((\d+)\)/);
    db.aaData.push([arr[0], S(arr[2]).s, arr[3], arr[6]]);
  }).then(function () {
    fs.writeFile("public/movies.json", JSON.stringify(db));
    console.log('Movie JSON was created successfully!');
  });
};

