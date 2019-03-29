// Real-time API
const express = require('express');
// eslint-disable-next-line
const router = express.Router();
const db = require('./db');

// Enable web sockets
const expressWs = require('express-ws');
expressWs(router);

// Create set for connected '/rtapi/notify' clients
let notifyConnected = new Set();
router.ws('/notify', (ws, req) => {
  // Perform housekeeping for opening a WS connection
  notifyConnected.add(ws);

  // Perform clean-up for when a WS closes
  ws.on('close', () => {});

  // Perform action when the WS `ws` sends a message
  ws.on('message', () => {});
});
