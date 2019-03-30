// Real-time API
const express = require('express');
// eslint-disable-next-line
const router = express.Router();
const db = require('./db');
const gatekeeper = require('./gatekeeper');

// Create set for connected '/rtapi/notify' clients
let notifyConnected = new Set();
router.ws('/notify', (ws, req) => {
  // Perform housekeeping for opening a WS connection
  notifyConnected.add(ws);

  // Perform clean-up for when a WS closes
  ws.on('close', () => {
    console.log('socket closed: ' + ws.sequence);
  });

  // Perform action when the WS `ws` sends a message
  ws.on('message', (msg) => {
    let m = ws.sequence + ' ' + msg;
    console.log(m);
    ws.send(m);
  });
  console.log('socket open: ', ws.sequence);
});

module.exports = router;
