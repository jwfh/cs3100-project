const db = require('./db');

register = (req, res) => {

};

signIn = (req, res) => {
  res.status(202);
  res.send({ok:true});

};

signOut = (req, res) => {

};

module.exports.gatekeeper = (req, res) => {
  switch (req.body.action) {
    case 'sign-in':
      signIn(req, res);
      break;
    case 'sign-out':
      signOut(req, res);
      break;
    case 'register':
      register(req, res);
      break;
    case 'reset':
      reset(req, res);
      break;
    default:
      res.status(400);
      res.type('text');
      res.send('400 Bad Request');
  }
}
