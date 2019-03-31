const db = require('./db');
const settings = require('../settings');
const sha256 = require('sha-256-js');
const cookieSession = require('cookie-session');

// Check for expired sessions and delete them from the database once per minute
setInterval(() => {
  const now = new Date();
  db.all('session', (error, rows) => {
    if (!error && rows) {
      for (let i = 0; i < rows.length; i++) {
        if (rows[i].updatedAt + settings.sessionLenth > now) {
          db.delete(
            'session',
            {
              sID: rows[i].id,
            },
            (error) => {
              if (settings.debug) {
                if (!error) {
                  console.log('Cleaning stale session...');
                } else {
                  console.log('Erorr cleaning stale session...');
                }
              }
            }
          );
        }
      }
    } else if (settings.debug) {
      console.log('Erorr fetching stale sessions...');
    }
  });
}, 60000);

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
        username: req.body.username.toLowerCase(),
        email: req.body.email,
        password: sha256(req.body.username.toLowerCase() + req.body.password),
        secA: sha256(
          req.body.username.toLowerCase() +
            req.body.secA.toLowerCase().replace(/\s/g, '')
        ),
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
  if (req.body.value && req.body.value.username && req.body.value.password) {
    db.get(
      'userByUsername',
      {username: req.body.value.username.toLowerCase()},
      (error, row) => {
        if (!error) {
          console.log(req.body.value);
          if (row.lockoutCount < settings.lockoutCount) {
            if (
              sha256(
                req.body.value.username.toLowerCase() + req.body.value.password
              ) === row.password
            ) {
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
      }
    );
  } else {
    res.send({
      ok: false,
      message: 'Username or password not supplied.',
    });
  }
};

const signOut = (req, res) => {};

const reset = (req, res) => {
  console.log(req.body);
  if (
    req.body.value &&
    req.body.value.username &&
    req.body.value.secA &&
    req.body.value.newPassword
  ) {
    db.get(
      'userByUsername',
      {username: req.body.value.username.toLowerCase()},
      (error, row) => {
        if (!error) {
          if (
            row.username === req.body.value.username &&
            sha256(
              req.body.value.username.toLowerCase() +
                req.body.value.secA.toLowerCase().replace(/\s/g, '')
            ) === row.secA
          ) {
            db.update(
              'USERS',
              'password',
              sha256(row.username + req.body.value.newPassword),
              row.id,
              (error) => {
                if (!error) {
                  res.send({
                    ok: true,
                    message: 'Password reset was successful.',
                  });
                } else {
                  res.send({
                    ok: false,
                    message: `Unable to reset password: ${error}`,
                  });
                }
              }
            );
          } else {
            res.send({
              ok: false,
              message: 'Security answer is incorrect.',
            });
          }
        } else {
          res.send({
            ok: false,
            message: `An error ocurred when contacting the database: ${error}`,
          });
        }
      }
    );
  } else {
    res.send({
      ok: false,
      message: 'Username, security answer, or new password were not supplied.',
    });
  }
};

module.exports.auth = (req) => {
  return {
    authenticated: false,
    admin: false,
  };
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
};
