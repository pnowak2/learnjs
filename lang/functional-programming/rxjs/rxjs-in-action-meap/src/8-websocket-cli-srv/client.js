const Rx = require('rxjs/Rx');
const WebSocket = require('websocket');

const websocket = new WebSocket('ws://localhost:1337');

Rx.Observable.fromEvent(websocket, 'message')
  .map(msg => JSON.parse(msg.data))
  .pluck('msg')
  .subscribe(console.log);