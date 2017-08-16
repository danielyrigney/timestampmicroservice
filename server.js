// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var moment = require('moment');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/:time", function (request, response) {
  var input = request.params["time"];
  var output = getDate(input);
  response.send(output);
});

function getDate(input) {
  
  var m = moment(input);
  
  if (input >= 0) {
      var unixDate = input; 
      var a = new Date(input * 1000);
      var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var naturalDate = date + ' ' + month + ' ' + year;
  } else if (m.isValid()) {
      var unixDate = new Date(input).getTime() / 1000;
      var naturalDate = input;     
  } else {
      unixDate = NaN; 
      naturalDate = NaN; 
  }
  
  var output = {"unix": unixDate, "natural": naturalDate};
  
  return output;
}



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


