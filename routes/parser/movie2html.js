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
	//fout.write("<link rel='stylesheet' href='/stylesheets/table.css'>\n");
    var h = [
      "<!DOCTYPE html><html><head><title></title>",
      "<link rel='stylesheet' href='/stylesheets/style.css'>",
      "<link rel='stylesheet' href='/stylesheets/button.css'>",
      "<link rel='stylesheet' href='/DataTables/media/css/demo_page.css'>",
      "<link rel='stylesheet' href='/DataTables/media/css/jquery.dataTables.css'>",
      "<script type='application/javascript' src='/jquery-easyui/jquery.min.js'></script>",
      "<script type='application/javascript' src='/javascripts/movies.js'></script>",
      "<script type='application/javascript' src='/DataTables/media/js/jquery.js'></script>",
      "<script type='application/javascript' src='/DataTables/media/js/jquery.dataTables.js'></script>",
      "<script type='text/javascript'>",
      "  $(document).ready(function() {", 
      "    $('#movies').dataTable();", 
      "} );",
      "</script>"
    ];
    var b = [
	  "</head><body><h1>Movies Database</h1><hr>",
	  "<div class='buttonwrapper' onClick='return false'>",
	  "<a class='squarebutton' href='#' onClick='TR_toggle_all()'><span>All Items</span></a>", 
	  "<a class='squarebutton green' href='#' style='margin-left: 10px' onClick='TR_toggle_rates()'><span>Rated Item(s)</span></a>", 
	  "<a class='squarebutton orange' href='#' style='margin-left: 10px' onClick='TR_toggle_recommendation()'><span>Recommendation(s)</span></a>",
	  "<div class='usernameblock'><select id='userlist'><option>Select user</option></select>",
	  "or <input type='text' id='username' placeholder='input new user'/><button id='updateBtn' type='button'>Update</button></div></div>",
	  "<table id='movies'><thead><tr><th>ID</th><th>Name</th><th>Genre</th><th width='250px'>Rating</th></tr></thead>\n<tbody id='mid'>"
    ];
    fout.write(h.join('\n'));
    fout.write(b.join('\n'));
  });

  lineReader.eachLine("movies/movies.dat", function(line, last) {
    var arr = line.split("::");
    fout.write("<tr id='mid" + arr[0] + "'>");
    fout.write("<td>" + arr[0]);
    fout.write("<td><a href='http://movielens.umn.edu/movieDetail?movieId=" + arr[0] + "'>" + arr[1] + "</a>");
    fout.write("<td>" + arr[2]);

	// it takes way longer to render html in client javascript dynamically
/*
	fout.write("<td><label><input type='radio' name='mid" + arr[0] + "' value='5' /> 5 </label>");
	fout.write("<label><input type='radio' name='mid" + arr[0] + "' value='4' /> 4 </label>");
	fout.write("<label><input type='radio' name='mid" + arr[0] + "' value='3' /> 3 </label>");
	fout.write("<label><input type='radio' name='mid" + arr[0] + "' value='2' /> 2 </label>");
	fout.write("<label><input type='radio' name='mid" + arr[0] + "' value='1' /> 1 </label>");
*/
   fout.write('<td>54321');

    if (last)
    {
      fout.write("\n</tbody></table></body></html>");
      fout.end();
      console.log('Movie.html was created successfully!');
    }
  });
};

