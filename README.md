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

The server can be started with an optional argument to be a long-polling server.
If no argument is given, it defaults to a WebSocket server.

To start the server as a long-polling server, use the command:
<code>node server.js xhr-polling</code>


### To add concurrent "listener" clients:
<code>node listenClient.js [transport] [numberOfClients] [rampupInterval] [host/IP] [port]</code>

Example: <code>node listenClient.js websocket 250 500 192.168.1.100 3000</code> will add one connection every 500 milliseconds until it reaches 250 concurrent connections.

All of the arguments in the square brackets are optional.
- <code>[transport]</code> determines which transport to connect with. Defaults to 'websocket'.
- <code>[numberOfClients]</code> determines how many concurrent users will connect to the WebSocket server. Defaults to 10.
- <code>[rampupInterval]</code> determines the time between adding clients in milliseconds. Defaults to 1000 milliseconds.
- <code>[host/IP]</code> hostname or IP address of WebSocket server. Defaults to localhost.
- <code>[port]</code> port number of the WebSocket server. Defaults to 3000.

### Lastly, to add a "broadcaster" client:
<code>node broadcastClient.js [transport] [messageRate] [host/IP] [port] [messageType]</code>
Example: <code>node broadcastClient.js websocket 1000 192.168.1.100 3000</code>

- <code>[messageRate]</code> Determines how quickly messages are sent to the server. Defaults to 1000 milliseconds.
- <code>[messageType]</code> messageType can be either 'fixed', 'send', or 'broadcast'. Fixed means that messages will be sent at a fixed rate which is the [messageRate] argument. Send means that the message sent to the server will only be sent back to the sender, and not to all listeners. Lastly, Broadcast means that messages sent to the server are broadcasted to all listeners.

Again, arguments in the square brackets are optional...HOWEVER, in order to use arguments at the end of the argument list, the earlier arguments need to be given.

For example, to change the [messageType] argument, all the arguments, [transport] [messageRate] [host/IP] and [port] also need to be specified.
This rule applies to both listenClient and broatcastClient!


#### Final recommendations:
It can be taxing to run all three modules (server, listener, and broadcaster) on a single computer.

When I was running benchmarks, I ran server.js on my desktop, then listener and broadcaster were run from my laptop.
At the last moment, I separated listener and broadcaster further by running listener on my microserver (raspberry pi), so each module was run on a separate machine.

The benchmarks were improved SIGNIFICANTLY!
