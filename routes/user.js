
/*
 * GET users listing.
 */
exports.list = function(req, res){
  var fs =require('fs');
  var lineReader = require('line-reader');

  // assume URL as /movies/Samuel, and default user id from 10000
  var users = [];

  lineReader.eachLine("movies/users.dat", function(line) {
    var arr = line.split("::");
    users.push({name: arr[1], id: arr[0]});
  }).then(function () {
    res.send(users);
  });
};

exports.list.html = function(req, res){
  var users = [ { name: 'Jimmy', office: 'Taipei' },
                { name: 'Winston', office: 'Taipei' },
                { name: 'Samuel', office: 'Freemout' },
                { name: 'Jeremy', office: 'Northpole' } ];
  res.render('users', { title: 'CEI User Database', users: users });
};

/*
 *  * GET specific user 
 *   */

exports.read = function(req, res){
  if (req.params.office)
    res.send("Hello " + req.params.name + " from " + req.params.office);
  else
    res.send("Hello " + req.params.name);
};
