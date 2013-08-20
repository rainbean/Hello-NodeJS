
/*
 * GET movies page.
 */
exports.list = function(req, res){
  res.render('movies');
};

/*
 * GET user's rating in JSON format
 */
exports.getRate = function(req, res){
  var fs =require('fs');
  var lineReader = require('line-reader');

  // assume URL as /movies/Samuel, and default user id from 10000
  var user = { name: req.params.name, id: 10000, rating: null };
  var rates = [];
  
  lineReader.eachLine("movies/users.dat", function(line) {
    var arr = line.split("::");
    if (arr[1] == user.name) {
      user.id = arr[0];
      return false; // stop reading file
    }
  });
  
  lineReader.eachLine("movies/ratings.dat", function(line) {
    var arr = line.split("::");
    if (arr[0] == user.id) {
      // found rated movies
      rates.push({id: arr[1], rate: arr[2]});
    }
  });
  
  user.rating = rates;
  res.send(user);
};

/*
 * SET user's rating in JSON format
 */
exports.setRate = function(req, res) {
  var fs =require('fs');
  var lineReader = require('line-reader');

  // debug only
  console.log (req.body);
  //var user = JSON.parse(req.body);
  var user = req.body;

  // assume URL as /movies/Samuel, and default user id from 10000
  //var user = { name: req.params.name, id: 10000, rating: null };
  //var rates = [];
  var realID = user.id+1;

  // validate user data
  lineReader.eachLine("movies/users.dat", function(line, last) {
    var arr = line.split("::");
    if (arr[1] == user.name) {
      user.id = realID = parseInt(arr[0]);
      return false; // stop reading file
    }
    realID++; // advance user id in case it's new user
  }).then(function () {
    if (realID != user.id) {
      // user not found at EOF, treat as new user
      user.id = realID;
      console.log ("add user to users.dat");
      fs.appendFile("movies/users.dat", user.id + "::" + user.name + "\n");
    }

    user.rating.forEach(function (rate) {
      fs.appendFile("movies/ratings.dat", 
          user.id + "::" + rate.id + "::" + rate.rate + "\n");
    });

    res.send(user);
  });

/*
    // update user's rating result
    lineReader.eachLine("movies/ratings.dat", function(line) {
      var arr = line.split("::");
      if (arr[0] == user.id) {
        // a rated movies found
        rates.push({id: arr[1], rate: arr[2]});
      }
    }).then(function () {
      // send out user data as json
      user.rating = rates;
      res.send(user);
    });
*/

}

