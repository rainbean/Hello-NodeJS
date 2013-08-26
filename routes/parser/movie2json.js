/* 
 * Generate Movie Database JSON file
 */
exports.generate = function() {
  var fs = require('fs');
  var lineReader = require('line-reader');
  var S = require('string');

  fs.exists("db/movies.dat", function (exists) {
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
  lineReader.eachLine('db/movies.dat', function(line, last) {
    //console.log(line);
    var arr = line.split(/::|\((\d+)\)/);
    db.aaData.push([arr[0], S(arr[2]).trim().s, arr[3], S(arr[6]).trim().truncate(25).s]);
  }).then(function () {
    fs.writeFile("public/movies.json", JSON.stringify(db));
    console.log('Movie JSON was created successfully!');
  });
};

