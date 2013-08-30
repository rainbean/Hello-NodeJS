/*
 * Fetch db file.
 */
exports.get = function(req, res) {
  res.sendfile('db/' + req.params.name);
}

/*
 * Update db file.
 *
 * Example: 
 *   $curl -i -F file=@movies.db http://localhost:3000/db/movies.db
 */
exports.post = function(req, res) {
  var fs = require('fs');
  var target = 'db/' + req.params.name;
  fs.exists(req.files.file.path, function (exists) {
    if (exists) {
      fs.unlink(target, function(err) {
        var is = fs.createReadStream(req.files.file.path);

        is.pipe(fs.createWriteStream(target));
        is.on('end',function() {
          fs.unlinkSync(req.files.file.path);
          res.send(200, 'database ' + req.params.name + ' updated, size ' + req.files.file.size + '.\n\n');
        });
      });
    }
	else
      res.send(404, 'not a valid database\n');
  });
}

