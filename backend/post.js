const db = require('./db');

module.exports.create = (req, res, next) => {
  console.log(req.path, req.body);
  switch (req.body.type) {
    case 'question':
      if (
        req.body.title &&
        req.body.content &&
        req.body.tags &&
        req.body.level
      ) {
        db.create(
          'question',
          {
            title: req.body.title,
            content: req.body.content,
            tags: req.body.tags,
            level: req.body.level,
          },
          (error, route) => {
            if (!error) {
              res.status(200);
              res.send({
                route,
              });
            } else {
              res.status(500);
              res.send(error);
              console.log('Unable to create post', error);
            }
          }
        );
      } else {
        res.status(400);
        res.send(
          'Unable to complete the post create request. Missing required parameters.'
        );
      }
      break;
    case 'answer':
      break;
    case 'tag':
      break;
    default:
      next();
      break;
  }
};

module.exports.delete = (req, res) => {};
