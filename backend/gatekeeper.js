const db = require('./db');
const settings = require('../settings');
const sha256 = require('sha-256-js');
const cookieSession = require('cookie-session');

const register = (req, res) => {
  if (
    req.body.name &&
    req.body.username &&
    req.body.password &&
    req.body.email &&
    req.body.secQ &&
    req.body.secA
  ) {
    db.create(
      'user',
      {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: sha256(req.body.password),
        secA: sha256(req.body.secA),
        secQ: req.body.secQ,
      },
      (error) => {
        if (!error) {
          res.send({
            ok: true,
            message: 'User account creation was successful.',
          });
        } else {
          res.send({
            ok: false,
            message: `Error creating new user: ${error}`,
          });
        }
      }
    );
  } else {
    res.send({
      ok: false,
      message: 'Request missing required parameters to add new user.',
    });
  }
};

const signIn = (req, res) => {
  if (req.body.username && req.body.password) {
    db.get('userByUsername', { username: req.body.username }, (error, row) => {
      if (!error) {
        if (row.lockoutCount < 10) {
          if (sha256(req.body.password) === row.password) {
            res.send({
              ok: true,
              message: 'Access granted',
            });
          } else {
            db.update(
              'USERS',
              'lockoutCount',
              row.lockoutCount + 1,
              row.id,
              (error) => {
                if (error && settings.debug) {
                  console.log('Error updating lockout count:', error);
                }
              }
            );
            res.send({
              ok: false,
              message: 'Invalid password.',
            });
          }
        } else {
          res.send({
            ok: false,
            message:
              'Your account is locked due to multiple invalid sign-in attempts.',
          });
        }
      } else {
        res.send({
          ok: false,
          message: `Database fetch error: ${error}`,
        });
      }
    });
  } else {
    res.send({
      ok: false,
      message: 'Username or password not supplied.',
    });
  }
};

const signOut = (req, res) => {};

const reset = (req, res) => {};

module.exports.isAdmin = (req) => {};

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
