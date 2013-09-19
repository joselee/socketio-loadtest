socketio-loadtest
=================

Modified version of socket.io-benchmark to fit my needs.
In the original socket.io-benchmark (https://github.com/michetti/socket.io-benchmark),
every connected client sent messages, and the server responds to each of them.
Upon receiving responses, both server and client sent more messages for infinite looping.

For my project, I required a Large number of "listener" clients that do NOT send any messages.
Then, there is just one client, the "broadcaster", who sends broadcasts to everyone.


Installation:
=================
npm install (in cloned directory)

Usage:
==========

### First start the server with:
<code>node server.js</code>

### To add concurrent "listener" clients:
<code>node listenClient.js [numberOfClients] [rampupInterval] [host/IP] [port]</code>

Example: <code>node listenClient.js 250 500 192.168.1.100 8000</code> will add one connection every 500 milliseconds until it reaches 250 concurrent connections.

All of the arguments in the square brackets are optional.
- <code>[numberOfClients]</code> determines how many concurrent users will connect to the WebSocket server. Defaults to 10.
- <code>[rampupInterval]</code> determines the time between adding clients in milliseconds. Defaults to 1000 milliseconds.
- <code>[host/IP]</code> hostname or IP address of WebSocket server. Defaults to localhost.
- <code>[port]</code> port number of the WebSocket server. Defaults to 3000.

### Lastly, to add a "broadcaster" client:
<code>node broadcastClient.js [host/IP] [port]</code>
Example: <code>node broadcastClient.js 192.168.1.100 8000</code>

Again, arguments in the square brackets are optional.
