var express = require('express'), app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

server.listen(8080, function(){
    console.log("Server ready.");
});

var messages = [];

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/tester.html');
});

app.get('/starter', function(req, res){
    res.sendFile(__dirname + '/public/starter.html');
});

app.get('/finisher', function(req, res){
    res.sendFile(__dirname + '/public/finisher.html');
});

io.on('connection', function (socket) {
    console.log("New client connected.");
    if(messages.length==0){
        socket.emit('news', 'Init!');
    }
    else{
        messages.forEach(element => {
            socket.emit('news', element);
        });
    }
    
    socket.on('messages', function (data) {
        console.log("client data: >" + data + "<");

        messages.push(data);

        if(data=="timer_start"){
            data+="_" + getServerTime();
        }
        if(data=="timer_finish"){
            data+="_" + getServerTime();
        }

        //emit data to the original sender
        socket.emit('news', data);
        //emit data to all connected clients
        socket.broadcast.emit('news', data);

    });
    socket.on('disconnect', function () {
        console.log("Client disconnected.");
    });
});

function getServerTime(){
    return Date.now();
}