# wsmanager

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![Dependency Status][depstat-image]][depstat-url]
[![Downloads][download-badge]][npm-url]

> An easy to use WebSocket manager. 

WSManager keeps an in memory hashmap with all active WS connections and maintains it through out app's lifecycle. WSManager stores different accounts and their connected clients as WebSocket objects that you can retrieve at any time.

## Install

```sh
npm i -D wsmanager
```

## Usage

```js
...
/* I am using `[ws](https://github.com/websockets/ws)` here */

import wsmanager from "wsmanager"

const account = 'SOME_ACCOUNT';

wss.on('connection', function (ws) {

    wsmanager.connect(account, ws);
    
    ws.on('close', function() {
        wsmanager.disconnect(account, ws);    
    })
})

...

let connections = wsmanager.getConnectionsFrom(account)
connections.forEach(function(ws){
    ws.send('Sup?');
})

...

```

## Docs

Add a client to that Account, using a function directly:
```
wsmanager.connect(account, socket)
```
* account(required): a unique identifier for an account
* socket(required): a WebSocket object

or using events:
```
wsmanager.emit('connection', {account:account, socket:socket})
```

Remove a client, using a function directly:
```
wsmanager.disconnect(account, socket)
```
* account(required): a unique identifier for an account
* socket(required): a WebSocket object

or using events:
```
wsmanager.emit('disconnection', {account:account, socket:socket})
```

Get all connections:
```
wsmanager.getConnections()
```

Get all connections by an Account:
```
wsmanager.getConnections(account)
```
* account(required): a unique identifier for an account

## License

MIT © [Kostas Bariotis](http://kostasbariotis.com)

[npm-url]: https://npmjs.org/package/wsmanager
[npm-image]: https://img.shields.io/npm/v/wsmanager.svg?style=flat-square

[travis-url]: https://travis-ci.org/kbariotis/wsmanager
[travis-image]: https://img.shields.io/travis/kbariotis/wsmanager.svg?style=flat-square

[coveralls-url]: https://coveralls.io/r/kbariotis/wsmanager
[coveralls-image]: https://img.shields.io/coveralls/kbariotis/wsmanager.svg?style=flat-square

[depstat-url]: https://david-dm.org/kbariotis/wsmanager
[depstat-image]: https://david-dm.org/kbariotis/wsmanager.svg?style=flat-square

[download-badge]: http://img.shields.io/npm/dm/wsmanager.svg?style=flat-square
