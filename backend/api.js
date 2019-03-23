const express = require('express');
// eslint-disable-next-line
const router = express.Router();

const fetch = require('./fetch');
const post = require('./post');
const gatekeeper = require('./gatekeeper');
const validate = require('./validate');

/* GET should never give any data. All API requests should be POST. */
router.get('/*', (req, res) => {
  res.status(404);
  res.type('text');
  res.send('404 Not Found');
});

router.post('/fetch', fetch.fetch);
router.post('/fetch/all', fetch.all);

router.post('/post/create', post.create);
router.post('/post/delete', post.delete);

router.post('/gatekeeper', gatekeeper.gatekeeper);

router.post('/validate', validate.validate);

module.exports = router;

