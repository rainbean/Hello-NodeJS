var fs =require('fs');
var lineReader = require('line-reader');

var user = { name: "Samuel", id: 10001, rating: null };
var rates = [];

rates.push({id: 7, rate: 3});
rates.push({id: 100, rate: 2});
rates.push({id: 18, rate: 5});
user.rating = rates;


//console.log(user);
console.log(JSON.stringify(user, null, 2));


/*
var realID = 0;
  lineReader.eachLine("movies/users.dat", function(line, last) {
    console.log(line);
    var arr = line.split("::");
    if (arr[1] == user.name) {
    console.log("user found");
      user.id = realID = parseInt(arr[0]);
      return false; // stop reading file
    }
    if (last) {
      realID = parseInt(arr[0])+1; 
      console.log ("realID = " + realID);
    } 
  }).then(function () {
      if (realID != user.id) {
        // user not found after file read, treat as new user
        user.id = realID;
        fs.appendFile("movies/users.dat", user.id + "::" + user.name + "\n");
      }
      console.log(user);
  });

*/
