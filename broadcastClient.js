var io = require('socket.io-client');

var host = process.argv[2] ? process.argv[2]  : 'localhost';
var port = process.argv[3] ? process.argv[3]  : '3000';

var socket = io.connect('http://' + host + ':' + port, {'force new connection': true});

socket.on('connect', function(){
  // Send a message at a specified interval
  sendLoop();

  // Send initial message, and wait for reply to send another
  //sendOnResponse();
});

function sendLoop(){
  setTimeout(function(){
    socket.emit('broadcast', 'asdf');
    sendLoop();
  }, 9);
}

function sendOnResponse(){
  socket.emit('broadcast', 'foo bar');
  socket.on('broadcast', function(){
    socket.emit('broadcast', 'foo bar');
  });
}