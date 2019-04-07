const db = require('./db');
const settings = require('../settings');

module.exports.fetch = (req, res) => {
  console.log(req.path, req.body);
  switch (req.body.type) {
    case 'secQ':
      if (req.body.value && req.body.value.username) {
        db.get(
          'userByUsername',
          {username: req.body.value.username},
          (error, row) => {
            if (!error) {
              if (typeof row === 'undefined') {
                res.send({
                  ok: false,
                  message: 'User does not exist.',
                });
              } else {
                // Got a user
                res.send({
                  ok: true,
                  secQ: row.secQ,
                  message: 'User exists',
                });
              }
            } else {
              res.send({
                ok: false,
                message: `Error contacting database: ${error}`,
              });
            }
          }
        );
      } else {
        res.status(400);
        res.type('text');
        res.send('Bad Request');
      }
      break;
    case 'question':
      if (req.body.value && req.body.value.idHash) {
        db.get('question', {idHash: req.body.value.idHash}, (error, row) => {
          if (!error) {
            if (typeof row !== 'undefined') {
              res.send({
                ok: true,
                post: row,
              });
            } else {
              res.send({
                ok: false,
                message: 'ID doesn\'t exist',
              });
            }
          } else {
            res.send({
              ok: false,
              message: `Error contacting database: ${error}`,
            });
          }
        });
      } else {
        res.status(400);
        res.type('text');
        res.send('Bad Request');
      }
      break;
    case 'profile':
      var authenticated;
      if (
        typeof req.cookies.numHubSessionKey !== 'undefined' ||
        (req.body.value && typeof req.body.value.sessionKey != 'undefined')
      ) {
        // Yes, cookie was present. Now check the database for the session.
        const numHubSessionKey =
          req.cookies.numHubSessionKey || req.body.value.sessionKey;
        db.get('session', {sessionKey: numHubSessionKey}, (error, session) => {
          if (!error && typeof session !== 'undefined') {
            db.get('userByID', {id: session.uid}, (error, user) => {
              if (!error) {
                res.send({
                  ok: true,
                  profile: user,
                });
              } else if (settings.debug) {
                console.log('Unable to fetch user from the database.');
                res.send({
                  ok: false,
                  message: 'No cookie or session key.',
                });
              }
            });
          } else {
            if (settings.debug) {
              console.log(
                `Unable to fetch cookie ${numHubSessionKey} from the database.`
              );
            }
            res.send({
              ok: false,
              message: 'No cookie or session key.',
            });
          }
        });
      }
      break;
    default:
      res.status(400);
      res.type('text');
      res.send('Bad Request');
      break;
  }
};

module.exports.all = (req, res) => {
  switch (req.body.type) {
    case 'tag':
    case 'level':
    case 'user':
    case 'question':
    case 'secQ':
      db.all(req.body.type, (error, rows) => {
        if (!error) {
          res.status(200);
          res.send(rows);
        } else {
          res.status(500);
          res.type('text');
          res.send(
            `Unable to retrieve ${req.body.type}s from database:${error}`
          );
        }
      });
      break;
    case 'answer':
      // TODO: Add check for cookie; only authenticated users should be able to see answers
      if (req.body.value && req.body.value.idHash) {
        db.get(
          req.body.type,
          {idHash: req.body.value.idHash},
          (error, rows) => {
            if (!error) {
              res.send({
                ok: true,
                answers: rows,
              });
            } else {
              res.send({
                ok: false,
                answers: null,
                message: error,
              });
            }
          }
        );
      } else {
        res.status(400);
        res.send({
          ok: false,
          message: 'Unable to find question; no question hash given.',
        });
      }
      break;
    default:
      res.status(400);
      res.type('text');
      res.send('Bad Request');
      break;
  }
};

module.exports.update = (req, res) => {
  switch (req.body.type) {
    case 'admin':
      if (req.body.value && req.body.value.uid) {
        db.update('USERS', 'admin', 1, req.body.value.uid, (error) => {
          if (!error) {
            res.send({
              ok: true,
              message: `Made UID ${req.body.value.uid} an admin.`,
            });
          } else {
            res.send({
              ok: false,
              message: error,
            });
          }
        });
      }
      break;
    case 'lockoutCount':
      if (req.body.value && req.body.value.uid) {
        db.update('USERS', 'lockoutCount', 0, req.body.value.uid, (error) => {
          if (!error) {
            res.send({
              ok: true,
              message: `Reset UID ${
                req.body.value.uid
              }'s lockout count to zero.`,
            });
          } else {
            res.send({
              ok: false,
              message: error,
            });
          }
        });
      }
      break;
    default:
      res.status(400);
      res.type('text');
      res.send('Bad Request');
      break;
  }
};

module.exports.create = (req, res) => {
  console.log(req.path, req.body);
  switch (req.body.type) {
    case 'question':
      if (
        req.body.value &&
        req.body.value.title &&
        req.body.value.content &&
        req.body.value.tags &&
        req.body.value.level &&
        req.body.value.sessionKey
      ) {
        db.create(
          'question',
          {
            title: req.body.value.title,
            content: req.body.value.content,
            tags: req.body.value.tags,
            level: req.body.value.level,
            sessionKey: req.body.value.sessionKey,
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
      res.status(400);
      res.type('text');
      res.send('Bad Request');
      break;
  }
};

module.exports.delete = (req, res) => {};
