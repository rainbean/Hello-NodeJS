var fs =require('fs');
var lineReader = require('line-reader');

//var line = "100001	[1784:5.0,440:4.7176538,2302:4.68732,2145:4.623387,2420:4.614244,2915:4.5852838,2174:4.584969,2262:4.55149,3526:4.5433555,357:4.5418167]";
/***
 Rules: A | B | C
  A <- /\s+\[/  match "	["
  B <- /:\d\.\d+,/  match ":4.7176538,"
  C <- /:\d\.\d+\]/ match ":4.5418167]"
 ***/
lineReader.eachLine("../movies/recommendation.dat", function(line) {
  var arr = line.split(/\s+\[|:\d\.\d+,|:\d\.\d+\]/); 
  for(var i in arr) {
    if (arr[i])
    console.log("'" + arr[i] + "'");
  }
});
