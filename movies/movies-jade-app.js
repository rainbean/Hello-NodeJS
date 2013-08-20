  var fs = require('fs');
  var lineReader = require('line-reader');

  fs.exists("movies.dat", function (exists) {
    if (!exists) {
      console.log('Movies.dat database not found.');
      process.exit(1);
    }
  });

  var fout = fs.createWriteStream("../views/movies.jade");
  // write header
  fout.on('open', function(fd) {
    fout.write("extends layout\n\nblock content\n  h1 Movies Database\n  hr\n");
    fout.write("  table\n");
    fout.write("    thead\n");
    fout.write("      tr\n");
    fout.write("        th Name\n");
    fout.write("        th Genre\n");
    fout.write("    tbody\n");
  });

  lineReader.eachLine('movies.dat', function(line, last) {
    //console.log(line);
    var arr = line.split("::");
    fout.write("      tr\n");
    fout.write("        td " + arr[1] + "\n");
    fout.write("        td " + arr[2] + "\n");
    //console.log("  td " + arr[1]);
    if (last)
    {
      fout.end();
      console.log('Movie.jade is created successfully!');
    }
  });

