const db = require('./db');
const sha256 = require('sha-256-js');
const settings = require('../settings');

module.exports.validate = (req, res) => {
  switch (req.body.type) {
  case 'username':
    if (req.body.value && req.body.value.username) {
      db.get(
        'userByUsername',
        {username: req.body.value.username.toLowerCase()},
        (error, row) => {
          if (!error) {
            if (typeof row === 'undefined') {
              res.send({
                ok: true,
                exists: false,
                message: 'We can\'t find that username.',
              });
            } else {
              res.send({
                ok: true,
                exists: true,
                message: 'Username exists.',
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
      res.send({
        ok: false,
        message: 'Bad Request. Username missing.',
      });
    }
    break;
  case 'secA':
    if (req.body.value && req.body.value.username && req.body.value.secA) {
      db.get(
        'userByUsername',
        {username: req.body.value.username.toLowerCase()},
        (error, row) => {
          if (!error) {
            if (typeof row === 'undefined') {
              res.send({
                ok: false,
                message: 'User does not exist.',
              });
            } else if (
              row.secA ===
                sha256(
                  req.body.value.username.toLowerCase() +
                    req.body.value.secA.toLowerCase().replace(/\s/g, '')
                )
            ) {
              // Answer must be correct
              res.send({
                ok: true,
                message: 'Security check successful',
              });
            } else {
              // Answer must not be correct
              res.send({
                ok: false,
                message: 'Hmm... that doesn\'t look right. Please try again.',
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
      res.send({
        ok: false,
        message: 'Bad Request. Username or security answer missing.',
      });
    }
    break;
  case 'password':
    // NOTE this is for checking if passwords meet complexity requirements,
    // not to check if they are correct for a particular user!
    if (req.body.value && req.body.value.password) {
      const candPass = req.body.value.password;
      if (candPass.length < settings.passwordPolicy.pMinLength) {
        res.send({
          ok: false,
          message: `Passwords must be at least ${
            settings.passwordPolicy.pMinLength
          } characters.`,
        });
      } else if (candPass.length > settings.passwordPolicy.pMaxLength) {
        res.send({
          ok: false,
          message: `Passwords must be no more than ${
            settings.passwordPolicy.pMaxLength
          } characters.`,
        });
      } else if (
        settings.passwordPolicy.pLetters &&
          !/[a-zA-Z]/.test(candPass)
      ) {
        res.send({
          ok: false,
          message: 'Passwords must contain letters.',
        });
      } else if (
        settings.passwordPolicy.pLowercase &&
          !/[a-z]/.test(candPass)
      ) {
        res.send({
          ok: false,
          message: 'Passwords must contain lowercase letters.',
        });
      } else if (
        settings.passwordPolicy.pUppercase &&
          !/[A-Z]/.test(candPass)
      ) {
        res.send({
          ok: false,
          message: 'Passwords must contain capital letters.',
        });
      } else if (settings.passwordPolicy.pDigits && !/[0-9]/.test(candPass)) {
        res.send({
          ok: false,
          message: 'Passwords must contain numbers.',
        });
      } else {
        res.send({
          ok: true,
          message: 'Password meets complexity requirements.',
        });
      }
    } else {
      res.status(400);
      res.send({
        ok: false,
        message: 'Bad Request. Candidate password missing.',
      });
    }
    break;
  default:
    res.status(400);
    res.send({
      ok: false,
      message: 'Bad Request. Type missing.',
    });
    break;
  }
};
