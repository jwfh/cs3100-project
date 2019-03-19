const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const fetch = require('./fetch');
const gatekeeper = require('./gatekeeper');

/* GET should never give any data. All requests should be POST. */
router.get('/*', (req, res) => {
  res.status(404);
  res.type('text');
  res.send('404 Not Found');
});

router.post('/fetch', jsonParser, fetch.fetch);
router.post('/fetch/all', jsonParser, fetch.all);

router.post('/register', jsonParser, gatekeeper.register);
router.post('/sign-in', jsonParser, gatekeeper.signIn);
router.post('/sign-out', jsonParser, gatekeeper.signOut);

module.exports = router;

