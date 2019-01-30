const express = require('express');
const router = express.Router();
const db = require('./db');

db.test();

/* POST API root */
router.post('/', function(req, res, next) {
  res.json({ title: 'Express' });
});

/* POST User profile page */
router.post('/profile', function(req, res, next) {
  res.json({ title: 'Profile Page'});
});

module.exports = router;

