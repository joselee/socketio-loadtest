var io = require('socket.io-client');

var users = parseInt(process.argv[2]);
var rampUpTime = parseInt(process.argv[3]);
var newUserTimeout = rampUpTime / users;
var host = process.argv[4] ? process.argv[4]  : 'localhost';
var port = process.argv[5] ? process.argv[5]  : '3000';

for(var i=0; i<users; i++) {
  setTimeout(function() {
    var socket = io.connect('http://' + host + ':' + port, {'force new connection': true});
  }, i * newUserTimeout);
};
