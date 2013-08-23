var fs =require('fs');
var lineReader = require('line-reader');
var S = require('string');

//var line = "100001	[1784:5.0,440:4.7176538,2302:4.68732,2145:4.623387,2420:4.614244,2915:4.5852838,2174:4.584969,2262:4.55149,3526:4.5433555,357:4.5418167]";

//var line = "1::Toy Story (1995)::Animation|Children's|Comedy";
var line = "1001::Associate, The (L'Associe)(1982)::Comedy"; 
/***
 Rules   <- A | B 
 Sample  <- 1::Toy Story (1995)::Animation|Children's|Comedy
  A <- /::/  match "::"
  B <- /\s\((\d+)\)/  match " (1995)"
 ***/
//lineReader.eachLine("../movies/recommendation.dat", function(line) {
  var arr = line.split(/::|\((\d+)\)/); 
  for(var i in arr) {
    //if (arr[i])
    console.log("'" + S(arr[i]).s + "'");
  }
//});
