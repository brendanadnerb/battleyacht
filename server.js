var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var port = process.env.PORT || 3000;
var game_socket = {};
var controller_sockets = {};

server.listen(port);

app.use('/', express.static(__dirname));

app.use('/static', express.static(__dirname + '/static'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

console.log('Server running on port: ' + port);

io.sockets.on('connection', function(socket) {
  socket.emit('connection', {
    message: 'player connected'
  });

  socket.on('action', function(data) {
    io.sockets.emit('action', data);
  });

});