var io = require('socket.io').listen(3000);
var exec = require('child_process').exec; 

io.configure(function() {
  var transport = process.argv[2] ? process.argv[2]  : 'websocket';
  console.log("Transport: " + transport);

  io.set('transports', [transport]);
  io.set('log level', 1);
  io.set('heartbeats', true);
  io.set('close timeout', 120);
  io.set('heartbeat timeout', 120);
  io.set('heartbeat interval', 40);
  io.set('polling duration', 40);  
  io.set('log level', 2);
});

// command to read process consumed memory and cpu time
var getCpuCommand = "ps -p " + process.pid + " -u | grep " + process.pid;

var users = 0;
var countReceived = 0;
var countSended = 0;

function roundNumber(num, precision) {
  return parseFloat(Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision));
}

setInterval(function() {
  var auxReceived = roundNumber(countReceived / users, 1)
  var msuReceived = (users > 0 ? auxReceived : 0);

  var auxSended = roundNumber(countSended / users, 1)
  var msuSended = (users > 0 ? auxSended : 0);

  // call a system command (ps) to get current process resources utilization
  var child = exec(getCpuCommand, function(error, stdout, stderr) {
    var s = stdout.split(/\s+/);
    var cpu = s[2];
    var memory = s[3];

    var l = [
      'U: ' + users,
      'MR/S: ' + countReceived,
      'MS/S: ' + countSended,
      'MR/S/U: ' + msuReceived,
      'MS/S/U: ' + msuSended,
      'CPU: ' + cpu,
      'Mem: ' + memory
    ];

    console.log(l.join(',\t'));
    countReceived = 0;
    countSended = 0;
  });

}, 1000);

io.sockets.on('connection', function(socket) {

  users++;

  socket.on('fixed', function(message) {
    countReceived++;
    io.sockets.emit('fixed', message);
    countSended += users;
  });

  socket.on('broadcast', function(message) {
    countReceived++;
    io.sockets.emit('broadcast', message);
    countSended += users;
  });


  socket.on('message', function(message){
    countReceived++;
    socket.emit('message', message);
    countSended ++;
  });

  socket.on('disconnect', function() {
    users--;
  })
});
