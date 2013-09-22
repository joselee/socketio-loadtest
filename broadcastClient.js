var io = require('socket.io-client');

var transport = process.argv[2] ? process.argv[2]  : 'websocket';
var rate = process.argv[3] ? process.argv[3]  : '100';
var host = process.argv[4] ? process.argv[4]  : 'localhost';
var port = process.argv[5] ? process.argv[5]  : '3000';

var socket = io.connect('http://' + host + ':' + port, {'force new connection': true, transports:[transport]});

socket.on('connect', function(){
	console.log(this.socket.transports);
  sendLoop();
//  sendOnResponse();
});

function sendLoop(){
  setTimeout(function(){
    socket.emit('broadcast', 'asdf');
    sendLoop();
  }, rate);
}

function sendOnResponse(){
  socket.emit('broadcast', 'foo bar');
  socket.on('broadcast', function(){
    socket.emit('broadcast', 'foo bar');
  });
}