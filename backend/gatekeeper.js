const db = require('./db');
const sha256 = require('sha-256-js');

const register = (req, res) => {};

const signIn = (req, res) => {
  if (req.body.username && req.body.password) {
    db.get('userByUsername', { username: req.body.username }, (error, row) => {
      if (!error) {
        res.status(200);
        if (sha256(req.body.password) === row.password) {
          res.send({
            ok: true,
            message: 'Access granted',
          });
        } else {
          // TODO
          db.update('user', 'lockoutCount');
          res.send({
            ok: false,
            message: 'Invalid password.',
          });
        }
      } else {
        res.status(500);
        res.send({
          ok: false,
          message: `Database fetch error: ${error}`,
        });
      }
    });
  } else {
    res.status(400);
    res.send({
      message: 'Username or password not supplied.',
    });
  }
};

const signOut = (req, res) => {};

const reset = (req, res) => {};

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
};
