  var fs = require('fs');
  var lineReader = require('line-reader');

  fs.exists("movies.dat", function (exists) {
    if (!exists) {
      console.log('Movies.dat database not found.');
      process.exit(1);
    }
  });

  var fout = fs.createWriteStream("movies.html");
  // write header
  fout.on('open', function(fd) {
    fout.write("<!DOCTYPE html><html><head><title></title><link rel='stylesheet' href='/stylesheets/style.css'><link rel='stylesheet' href='/stylesheets/table.css'></head>");
    fout.write("<body><h1>Movies Database</h1><hr><table><thead><tr><th>Name</th><th>Genre</th></tr></thead><tbody>");
  });

  lineReader.eachLine('movies.dat', function(line, last) {
    //console.log(line);
    var arr = line.split("::");
    fout.write("<tr>");
    fout.write("<td>" + arr[1]);
    fout.write("<td>" + arr[2]);
    //console.log("  td " + arr[1]);
    if (last)
    {
      fout.write("</tbody></table></body></html>");
      fout.end();
      console.log('Movie.html is created successfully!');
    }
  });

