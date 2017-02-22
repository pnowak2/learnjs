const Rx = require('rxjs/Rx');
const WebSocketServer = require('websocket').server;
const http = require('http');

const server = http.createServer();
server.listen(1337);

wsServer = new WebSocketServer({
  httpServer: server
});

Rx.Observable.fromEvent(wsServer, 'request')
  .map(request => request.accept(null, request.origin))
  .subscribe(connection => {
    connection.sendUTF(JSON.stringify({ msg: 'Hello Socket' }));
  });
