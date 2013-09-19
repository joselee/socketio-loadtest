socketio-loadtest
=================

Modified version of socket.io-benchmark to fit my needs.
In the original socket.io-benchmark (https://github.com/michetti/socket.io-benchmark),
every connected client sent messages, and the server responds to each of them.
Upon receiving responses, both server and client sent more messages for infinite looping.

For my project, I required a Large number of "listener" clients that do NOT send any messages.
Then, there is just one client, the "broadcaster", who sends broadcasts to everyone.


*h3 Installation:
=================
npm install (in cloned directory)

*h3 Usage:
==========

*h4 First start the server with:
{code}node server.js{code}

*h4 To add concurrent "listener" clients:
{code}node listenerClient.js [numberOfClients] [rampupInterval] [host/IP] [port]{code}

All of the arguments in the square brackets are optional.
- [numberOfClients] determines how many concurrent users will connect to the WebSocket server. Defaults to 10.
- [rampupInterval] determines the time between adding clients in milliseconds. Defaults to 1000 milliseconds.
- [host/IP] hostname or IP address of WebSocket server. Defaults to localhost.
- [port] port number of the WebSocket server. Defaults to 3000.

*h4 Lastly, to add a "broadcaster" client:
{code}node broadcastClient.js [host/IP] [port]{code}

Again, arguments in the square brackets are optional.
