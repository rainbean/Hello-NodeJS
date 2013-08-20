exports.run = function() {
  var fs = require('fs');
  var lineReader = require('line-reader');

  fs.exists("movies/movies.dat", function (exists) {
    if (!exists) {
      console.log('Movies.dat database not found.');
      process.exit(1);
    }
  });

  var fout = fs.createWriteStream("views/movies.html");
  // write header
  fout.on('open', function(fd) {
    fout.write("<!DOCTYPE html><html><head><title></title><link rel='stylesheet' href='/stylesheets/style.css'><link rel='stylesheet' href='/stylesheets/table.css'></head>");
    fout.write("<body><h1>Movies Database</h1><hr><table><thead><tr><th>ID</th><th>Name</th><th>Genre</th></tr></thead><tbody>");
  });

  lineReader.eachLine("movies/movies.dat", function(line, last) {
    var arr = line.split("::");
    fout.write("<tr>");
    fout.write("<td>" + arr[0]);
    fout.write("<td><a href='http://movielens.umn.edu/movieDetail?movieId=" + arr[0] + "'>" + arr[1] + "</a>");
    fout.write("<td>" + arr[2]);
    if (last)
    {
      fout.write("</tbody></table></body></html>");
      fout.end();
      console.log('Movie.html is created successfully!');
    }
  });
};

