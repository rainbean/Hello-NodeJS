/*
 * GET user's rating in JSON format
 */
exports.getRate = function(req, res){
  var fs =require('fs');
  var lineReader = require('line-reader');

  // assume URL as /movies/Samuel, and default user id from 10000
  var user = {name: req.params.name, id: 10000, rating: [], recommendation: []};
  var jimmy_recommendation = [{id: 1784}, {id: 440}, {id: 2302}, {id: 2145}, {id: 2420}, {id: 2915}, {id: 2174}, {id: 2262}, {id: 3526}, {id: 357}];
  user.recommendation = jimmy_recommendation;
  
  lineReader.eachLine("movies/users.dat", function(line) {
    var arr = line.split("::");
    if (arr[1] == user.name) {
      user.id = arr[0];
      return false; // stop reading file
    }
  }).then(function () {
    lineReader.eachLine("movies/ratings.dat", function(line) {
      var arr = line.split("::");
      if (arr[0] == user.id) {
        // found rated movies
        user.rating.push({id: arr[1], rate: arr[2]});
      }
    }).then(function () {
        res.send(user);
    });
  });
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

    // update movie rating database
    lineReader.eachLine("movies/ratings.dat", function(line, last) {
      var arr = line.split("::");
      if (arr[0] != user.id) {
        // remove user's existing ratings from database
        fs.appendFile("movies/ratings-tmp.dat", line + "\n");
      }
    }).then(function () {
      // add user's existing ratings to database
      if (user.rating) {
        user.rating.forEach(function (rate) {
          fs.appendFile("movies/ratings-tmp.dat", user.id + "::" + rate.id + "::" + rate.rate + "\n");
        });
      }
      // overwrite database
      fs.unlink("movies/ratings.dat", function (err) {
        if (err) throw err;
        fs.rename("movies/ratings-tmp.dat", "movies/ratings.dat");
      });

      // reply updated user data
      res.send(user);
    });
  });
}

