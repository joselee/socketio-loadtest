var io = require('socket.io-client');

var transport = process.argv[2] ? process.argv[2]  : 'websocket';
var rate = process.argv[3] ? process.argv[3]  : '100';
var host = process.argv[4] ? process.argv[4]  : 'localhost';
var port = process.argv[5] ? process.argv[5]  : '3000';
var messageType = process.argv[6] ? process.argv[6] : 'fixed';

var socket = io.connect('http://' + host + ':' + port, {'force new connection': true, transports:[transport]});

socket.on('connect', function(){
	console.log(this.socket.transports);

  if(messageType === "fixed"){
    fixedLoop();
  }
  else if (messageType === "send"){
    socket.send('message', 'foo');
  }
  else{
    socket.emit('broadcast', 'bar');
  }
});

function fixedLoop(){
  setTimeout(function(){
    socket.emit('fixed', 'asdf');
    fixedLoop();
  }, rate);
}

socket.on('broadcast', function(){
  socket.emit('broadcast', 'bar');
});

socket.on('message', function(){
  socket.send('message', 'foo');
});
