const db = require('./db');

module.exports.fetch = (req, res, next) => {
  console.log(req.path, req.body);
  switch (req.body.type) {
    default:
      next();
      break;
  }
};

module.exports.all = (req, res, next) => {
  console.log(req.path, req.body);
  switch (req.body.type) {
    case 'tag':
    case 'level':
      db.all(req.body.type, (error, rows) => {
        if (!error) {
          res.status(200);
          res.send(rows);
        } else {
          res.status(500);
          res.type('text');
          res.send('Unable to retrieve ' + req.body.type + 's from database:', error);
        }
      });
      break;
    default:
      next();
      break;
  }
};