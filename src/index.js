import util from "util";
import { EventEmitter } from 'events';

class SocketManager extends EventEmitter {

  constructor () {
    super();

    this.connections = {}

    this.on('disconnection', this._disconnect)
    this.on('connection', this._connect)
  }

  /**
   * @param payload.identifier A unique identifier
   * @param payload.conn A WebSocket object
   * @private
   */
  _disconnect (payload) {

    if (!payload.identifier) {
      throw new Error('account param can\'t be empty.')
    }

    let wsKey = this._parseKey(payload.conn);

    if (!(payload.identifier in this.connections)) {
      throw new Error('This account is not connected');
    }

    if (!(wsKey in this.connections[payload.identifier])) {
      throw new Error('No Connection found');
    }

    delete this.connections[payload.identifier][wsKey];

    if (!this.getConnectionsFrom(payload.identifier).length) {
      delete this.connections[payload.identifier];
    }

  }

  /**
   * @param payload.identifier A unique identifier
   * @param payload.conn A WebSocket object
   * @private
   */
  _connect (payload) {

    if (!payload.identifier) {
      throw new Error('payload param can\'t be empty.')
    }

    let wsKey = this._parseKey(payload.conn);

    if (!(payload.identifier in this.connections)) {
      this.connections[payload.identifier] = {}
    }

    this.connections[payload.identifier][wsKey] = payload.conn
  }

  connect (identifier, conn) {
    this._connect({
      identifier,
      conn
    })
  }

  disconnect (identifier, conn) {
    this._disconnect({
      identifier,
      conn
    })
  }

  /**
   * Parse the Connection's key
   *
   * @param conn
   * @returns String The unique hash key of the connection
   * @private
   */
  _parseKey (conn) {
    try {
      return conn.upgradeReq.headers['sec-websocket-key'];
    } catch (e) {
      throw new Error('Wrong Connection Object');
    }
  }

  getConnections () {
    return this.connections;
  }

  getConnectionsFrom (identifier) {

    if (!identifier) {
      throw new Error('account param can\'t be empty.')
    }

    if (identifier in this.connections) {
      return this.connections[identifier];
    } else {
      return []
    }

  }

}

export default new SocketManager()