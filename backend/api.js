const express = require('express');
const router = express.Router();
const db = require('./db');

/* GET should never give any data. All requests should be POST. */
router.get('/*', (req, res, next) => {
  res.status(404);
  res.type('text');
  res.send('404 Not Found');

  next();
});

/* POST User profile page */
router.post('/profile', (req, res, next) => {
  res.json({ 
    title: 'Profile Page'
  });

  next();
});

module.exports = router;

