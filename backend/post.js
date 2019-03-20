const db = require('./db');

module.exports.create = (req, res) => {
  console.log(req.path, req.body);
  switch(req.body.tyle) {
    case 'question':
      if (req.body.title && req.body.content && req.body.tags && req.body.level) {
        db.create('question', {
                    q_title: req.body.title, 
                    q_content: req.body.content, 
                    q_tags: req.body.tags, 
                    q_level: req.body.level, 
                  }, 
                  (error, newRoute) => {
          if (!error) {
            res.status(200);
            res.send({
              route: newRoute,
            });
          } else {
            res.status(500);
            res.send(error);
            console.log('Unable to create post', error);
          }
        });
      } else {
        res.status(400);
        res.send('Unable to complete the post create request. Missing required parameters.');
      }
      break;
    case 'answer':

      break;
    default:

      break;
  }
  
};

module.exports.delete = (req, res) => {

};
