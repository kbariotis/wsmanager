import test from "tape"
import wsmanager from "../src"
import EventEmitter from "events";

test("wsmanager", (t) => {

  t.plan(13)

  t.equal(true, wsmanager instanceof EventEmitter, "wsmanager is an instance of EventEmitter");

  t.throws(function () {
    wsmanager.emit('connection', {
      identifier: 'test',
      conn: {}
    });
  }, "throws exception with wrong object connection");

  wsmanager.emit('connection', {
    identifier: 'test',
    conn: {
      upgradeReq: {
        headers: {
          'sec-websocket-key': 'test'
        }
      }
    }
  });

  t.equal(1, Object.keys(wsmanager.getConnections()).length, "added a new connection");
  t.equal(1, Object.keys(wsmanager.getConnectionsFrom('test')).length, "added a new connection");

  t.throws(function () {
    wsmanager.emit('disconnection', {
      identifier: 'test',
      conn: {}
    });
  }, "throws exception with wrong object connection");

  wsmanager.emit('disconnection', {
    identifier: 'test',
    conn: {
      upgradeReq: {
        headers: {
          'sec-websocket-key': 'test'
        }
      }
    }
  });

  t.equal(0, Object.keys(wsmanager.getConnections()).length, "removed connection");
  t.equal(0, Object.keys(wsmanager.getConnectionsFrom('test')).length, "removed a new connection");

  t.throws(function () {
    wsmanager.connect('test', {});
  }, "throws exception with wrong object connection");

  wsmanager.connect('test', {
    upgradeReq: {
      headers: {
        'sec-websocket-key': 'test'
      }
    }
  });

  t.equal(1, Object.keys(wsmanager.getConnections()).length, "added a new connection");
  t.equal(1, Object.keys(wsmanager.getConnectionsFrom('test')).length, "added a new connection");

  t.throws(function () {
    wsmanager.disconnect('test', {});

  }, "throws exception with wrong object connection");

  wsmanager.disconnect('test', {
    upgradeReq: {
      headers: {
        'sec-websocket-key': 'test'
      }
    }
  });

  t.equal(0, Object.keys(wsmanager.getConnections()).length, "removed connection");
  t.equal(0, Object.keys(wsmanager.getConnectionsFrom('test')).length, "removed a new connection");

});
