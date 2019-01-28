var express = require('express');
var router = express.Router();

/* POST API root */
router.post('/', function(req, res, next) {
  res.json({ title: 'Express' });
});

/* POST User profile page */
router.post('/profile', function(req, res, next) {
  res.json({ title: 'Profile Page'});
});

module.exports = router;