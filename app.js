var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var port = 8080;

server.listen(port);
console.log("Server listen on Port " + port);

var my_stages = [];

app.get('/', function(req, resp){
    resp.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket) {
    socket.on("pageReady", function(data){
        console.log("page ready called...");
        socket.emit('newLine', 'this is a test');
    });
    socket.on("addStage", function(data) {
      console.log('new stage requested: >' + data + '<' );
      my_stages.push(data);
     
      
    });
    
    socket.emit('addStage', my_stages);

    /* socket.on('testSocket1', function(d){
        console.log("testSocket1 data: " + d);
    });

    socket.emit('testSocket1', "serverData"); */
   /* socket.on("disconnect", function() {
      return console.log('disconnected');
    }); */
  });


/* app.get('/stages', function(req,resp){
    resp.sendFile(__dirname + "/stage.html");
}); */

/* var messages = io.of('/messages');

io.on('connection', function(client){
    console.log('Client connected...');
    messages.emit('messages', {hello: 'world'}); 
    
    io.on('messages', function(data){
        console.log(data);
    })
    
}); */

/* io.on('stages', function(data){
    console.log('Stage info: ' + data);
}); */

