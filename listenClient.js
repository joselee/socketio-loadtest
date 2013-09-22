var io = require('socket.io-client');

var transport = process.argv[2] ? process.argv[2]  : 'websocket';

var users = parseInt(process.argv[3]);
users = users ? users : 10;

var addInterval = parseInt(process.argv[4]);
addInterval = addInterval ? addInterval : 1000;
//var newUserTimeout = rampUpTime / users;

var host = process.argv[5] ? process.argv[5]  : 'localhost';
var port = process.argv[6] ? process.argv[6]  : '3000';

for(var i=0; i<users; i++) {
  setTimeout(function() {  	
    var socket = io.connect('http://' + host + ':' + port, {'force new connection': true, transports:[transport]});
    
    socket.on('connecting', function () {console.log("trying to connect")});    
    socket.on("connect", function(){
    	console.log(this.socket.transports)
    	
    	socket.on("error", function(err){
    		console.log(err);
    	});
  	});
  	socket.on('connect_failed', function(error){console.log("connection failed. " + error)});
  }, i * addInterval);
};