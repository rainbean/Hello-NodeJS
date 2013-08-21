exports.run = function() {
  var fs = require('fs');
  var lineReader = require('line-reader');

  fs.exists("movies/movies.dat", function (exists) {
    if (!exists) {
      console.log('Movies.dat database was not found.');
      process.exit(1);
    }
  });

  var fout = fs.createWriteStream("public/movies.html");
  // write header
  fout.on('open', function(fd) {
    fout.write("<!DOCTYPE html><html><head><title></title>");
	fout.write("<link rel='stylesheet' href='/stylesheets/style.css'>");
	fout.write("<link rel='stylesheet' href='/stylesheets/table.css'>");
	fout.write("<link rel='stylesheet' href='/stylesheets/button.css'>");
	fout.write("<script type='application/javascript' src='/javascripts/movies.js' ></script></head>");
    fout.write("<body><h1>Movies Database</h1><hr>");
	fout.write("<div class='buttonwrapper' onClick='return false'>");
	fout.write("<a class='squarebutton' href='#' onClick='TR_toggle_all()'><span>All Items</span></a>"); 
	fout.write("<a class='squarebutton green' href='#' style='margin-left: 10px' onClick='TR_toggle_rates()'><span>Rated Item(s)</span></a>"); 
	fout.write("<a class='squarebutton orange' href='#' style='margin-left: 10px' onClick='TR_toggle_recommendation()'><span>Recommendation(s)</span></a>");
	fout.write("</div><table><thead><tr><th>ID</th><th>Name</th><th>Genre</th><th>Rating</th></tr></thead><tbody id='mid'>");
  });

  lineReader.eachLine("movies/movies.dat", function(line, last) {
    var arr = line.split("::");
    fout.write("<tr id='mid" + arr[0] + "'>");
    fout.write("<td>" + arr[0]);
    fout.write("<td><a href='http://movielens.umn.edu/movieDetail?movieId=" + arr[0] + "'>" + arr[1] + "</a>");
    fout.write("<td>" + arr[2]);

	// it takes way longer to render html in client javascript dynamically
	fout.write("<td><label><input type='radio' name='mid" + arr[0] + "' value='5' /> 5 </label>");
	fout.write("<label><input type='radio' name='mid" + arr[0] + "' value='4' /> 4 </label>");
	fout.write("<label><input type='radio' name='mid" + arr[0] + "' value='3' /> 3 </label>");
	fout.write("<label><input type='radio' name='mid" + arr[0] + "' value='2' /> 2 </label>");
	fout.write("<label><input type='radio' name='mid" + arr[0] + "' value='1' /> 1 </label>");

    if (last)
    {
      fout.write("</tbody></table></body></html>");
      fout.end();
      console.log('Movie.html was created successfully!');
    }
  });
};

