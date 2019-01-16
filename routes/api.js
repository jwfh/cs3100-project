var express = require('express');
var router = express.Router();

/* POST API root */
router.get('/', function(req, res, next) {
  res.json({ title: 'Express' });
});

module.exports = router;