/* var express = require('express')
var ejs = require('ejs')

var app = express();

app.get('/test', function(request, response){
    response.sendFile(__dirname + '/index.html');
});

app.listen(8080); */

var url = require('url');

options = {
  // add URL options here
  protocol: 'http',
  host: 'search.twitter.com',
  pathname: 'search.json',
  //search: 'q=codeschool'
  query: '?test'
};

var searchURL = url.format(options);
console.log(searchURL);