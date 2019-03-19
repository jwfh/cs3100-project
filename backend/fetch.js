const db = require('./db');

module.exports.fetch = (req, res) => {
  console.log(req.path, req.body);
  switch (req.body.type) {
    default:
      res.status(404);
      res.type('text');
      res.send('404 Not Found');
      break;
  }
};

module.exports.all = (req, res) => {
  console.log(req.path, req.body);
  if (req.body.type) {
    switch (req.body.type) {
      case 'tag':
      case 'level':
        db.all(req.body.type, (rows) => {
            res.status(200);
            res.send(rows);
        });
        break;
      default:
        res.status(404);
        res.type('text');
        res.send('404 Not Found');
        break;
    }
  } else {
    res.status(404);
    res.type('text');
    res.send('404 Not Found');
  }
};