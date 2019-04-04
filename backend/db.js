const settings = require('../settings');
const sha256 = require('sha-256-js');
const md5 = require('md5');
const sqlite3 = require('sqlite3').verbose();

const dbFile = __dirname + '/../numhub.db';

const db = new sqlite3.Database(
  dbFile,
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.error(err.message);
      process.exit(1);
    }
    module.exports.init();
    console.log('Connected to the NumHub database...');
  }
);

module.exports.init = () => {
  console.log('Beginning DB initialization...');
  db.serialize(() => {
    db.run('PRAGMA foreign_keys = ON;');
    console.log('Enabled foreign keys...');
    db.run(`\
    /* List of security questions. */
    CREATE TABLE IF NOT EXISTS \`SEC_Q\` (
      \`id\` INT AUTO_INCREMENT PRIMARY KEY,
      \`question\` VARCHAR(255)
    )`);
    console.log('Created security question table...');
    db.run(`\
    /* Table of users. */
    CREATE TABLE IF NOT EXISTS \`USERS\` (
      \`id\` INT AUTO_INCREMENT PRIMARY KEY,
      \`username\` VARCHAR(32) NOT NULL,
      \`name\` VARCHAR(256) NOT NULL,
      \`email\` VARCHAR(256) NOT NULL,
      \`password\` VARCHAR(256) NOT NULL,
      \`admin\` INT NOT NULL DEFAULT 0,
      \`lockoutCount\` INT DEFAULT 0,
      \`secQ\` INT NOT NULL,
      \`secA\` VARCHAR(255) NOT NULL,
      UNIQUE(\`username\`)
    )`);
    console.log('Created user table...');
    db.run(`\
    /* Table of active cookie sessions. */
    CREATE TABLE IF NOT EXISTS \`SESSIONS\` (
      \`id\` INT AUTO_INCREMENT PRIMARY KEY,
      \`uid\` INT NOT NULL,
      \`idHash\` TEXT NOT NULL,
      \`updatedAt\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (\`uid\`) REFERENCES \`USERS\`(\`id\`)
    )`);
    console.log('Created session table...');
    db.run(`\
    /* Question levels (i.e., Elementary, High School, Undergraduate, 
     * Graduate, etc.). 
     */
    CREATE TABLE IF NOT EXISTS \`Q_LEVELS\` (
      \`id\` INT AUTO_INCREMENT PRIMARY KEY,
      \`level\` VARCHAR(64)
    )`);
    console.log('Created question levels...');
    db.run(`\
    /* Table containing questions. */
    CREATE TABLE IF NOT EXISTS \`QUESTIONS\` (
      \`id\` INT AUTO_INCREMENT PRIMARY KEY,
      \`authorID\` INT NOT NULL,
      \`content\` TEXT NOT NULL,
      \`title\` TEXT NOT NULL,
      \`levelID\` INT NOT NULL,
      \`idHash\` TEXT NOT NULL,
      \`postTime\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(\`idHash\`),
      FOREIGN KEY (\`authorID\`) REFERENCES \`USERS\`(\`id\`),
      FOREIGN KEY (\`levelID\`) REFERENCES \`Q_LEVELS\`(\`id\`)
    )`);
    console.log('Created question table...');
    db.run(`\
    /* Table of question answers. */
    CREATE TABLE IF NOT EXISTS \`ANSWERS\` (
      \`id\` INT AUTO_INCREMENT PRIMARY KEY,
      \`authorID\` INT NOT NULL,
      \`qID\` INT NOT NULL,
      \`content\` TEXT NOT NULL,
      \`postTime\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (\`authorID\`) REFERENCES \`USERS\`(\`id\`),
      FOREIGN KEY (\`qID\`) REFERENCES \`QUESTIONS\`(\`id\`)
    )`);
    console.log('Created answer table...');
    db.run(`\
    /* List of possible question tags (i.e., #homework, #power-series,
     * #wave-equation, etc.). */
    CREATE TABLE IF NOT EXISTS \`TAGS\` (
      \`id\` INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
      \`tag\` VARCHAR(32)
    )`);
    console.log('Created tags table...');
    db.run(`\
    /* Table to maintain association of what tags a question has. */
    CREATE TABLE IF NOT EXISTS \`Q_TAGS\` (
      \`id\` INT AUTO_INCREMENT PRIMARY KEY,
      \`qID\` INT NOT NULL,
      \`qTagID\` INT NOT NULL,
      FOREIGN KEY (\`qID\`) REFERENCES \`QUESTIONS\`(\`id\`),
      FOREIGN KEY (\`qTagID\`) REFERENCES \`TAGS\`(\`id\`)
    )`);
    console.log('Created tag association table...');
    db.run(`\
    /* Table for to facilitate URL shortening (for sharing link feature). */
    CREATE TABLE IF NOT EXISTS \`URLS\` (
      \`id\` INT AUTO_INCREMENT PRIMARY KEY,
      \`uriLeaf\` VARCHAR(10),
      \`redirectQID\` INT NOT NULL,
      \`redirectAID\` INT DEFAULT NULL
    )`);
    console.log('Created URL shortener table...');
  });

  [
    {
      table: 'TAGS',
      field: 'tag',
      values: ['Geometry', 'Number Theory', 'Algebra', 'Calculus', 'Analysis'],
    },
    {
      table: 'Q_LEVELS',
      field: 'level',
      values: [
        'Primary',
        'Elementary',
        'Intermediate',
        'Secondary',
        'Undergraduate',
        'Graduate',
      ],
    },
    {
      table: 'SEC_Q',
      field: 'question',
      values: [
        'What town does your grandmother live in?',
        'What was your favourite childhood toy called?',
        'What was your favourite childhood book?',
        'What is your father\'s birthday?',
        'What is your favourite country outside North America?',
        'What was your childhood dream job?',
        'When did you begin dating your first girlfriend/boyfriend?',
      ],
    },
  ].map((data) => {
    data.values.map((text, index) => {
      db.serialize(() => {
        db.all(
          'SELECT * FROM `' + data.table + '` WHERE `' + data.field + '`=?',
          [text],
          (err, rows) => {
            if (err) {
              console.log(
                '[' + __filename + ']',
                'Error searching',
                data.field,
                'in',
                data.table,
                'for',
                text,
                err
              );
            } else if (rows.length === 0) {
              console.log('Adding', text, 'to', data.table);
              db.run(
                'INSERT INTO `' +
                  data.table +
                  '` (`id`, `' +
                  data.field +
                  '`) VALUES (?, ?)',
                [index, text],
                (err) => {
                  if (err) {
                    console.log(
                      '[' + __filename + ']',
                      'Error adding new',
                      data.field,
                      'to',
                      data.table,
                      'with value',
                      text,
                      err
                    );
                  }
                }
              );
            }
          }
        );
      });
    });
  });
};

module.exports.all = (type, callback) => {
  switch (type) {
    case 'tag':
      db.all('SELECT `id`,`tag` FROM `TAGS`', (error, rows) => {
        if (error) {
          console.log('[' + __filename + ']', 'Error retrieving tags:', error);
        }
        callback(error, rows);
      });
      break;
    case 'level':
      db.all('SELECT `id`,`level` FROM `Q_LEVELS`', (error, rows) => {
        if (error) {
          console.log(
            '[' + __filename + ']',
            'Error retrieving levels:',
            error
          );
        }
        callback(error, rows);
      });
      break;
    case 'session':
      db.all('SELECT `id`,`updatedAt` FROM `SESSIONS`', (error, rows) => {
        if (error) {
          console.log(
            '[' + __filename + ']',
            'Error retrieving sessions:',
            error
          );
        }
        callback(error, rows);
      });
      break;
    case 'user':
      db.all(
        'SELECT `id`,`username`,`name`,`email`,`admin`,`lockoutCount` FROM `USERS`',
        (error, rows) => {
          if (error) {
            console.log(
              '[' + __filename + ']',
              'Error retrieving users:',
              error
            );
          }
          for (let row of rows) {
            row.admin = row.admin === 1;
          }
          callback(error, rows);
        }
      );
      break;
    case 'question':
      db.all(
        'SELECT `id`,`title`,`content`,`levelID`,`idHash` FROM `QUESTIONS`',
        (error, rows) => {
          if (error) {
            console.log(
              '[' + __filename + ']',
              'Error retrieving questions:',
              error
            );
          }
          callback(error, rows);
        }
      );
      break;
    default:
      break;
  }
};

module.exports.get = (type, params, callback) => {
  switch (type) {
    case 'userByUsername':
      if (params.username) {
        db.get(
          'SELECT * from `USERS` where `username`=?',
          [params.username],
          (error, row) => {
            if (!error) {
              if (settings.debug) {
                console.log('User is', row);
              }
              if (typeof row !== 'undefined') {
                row.admin = row.admin === 1;
              }
              callback(error, row);
            } else {
              if (settings.debug) {
                console.log('Error:', error);
              }
              callback('Erorr contacting database.', null);
            }
          }
        );
      } else {
        callback('No username provided.', null);
      }
      break;
    case 'userByID':
      if (params.id) {
        db.get(
          'SELECT * from `USERS` where `id`=?',
          [params.id],
          (error, row) => {
            if (!error) {
              if (settings.debug) {
                console.log('User is', row);
              }
              if (typeof row !== 'undefined') {
                row.admin = row.admin === 1;
              }
              callback(error, row);
            } else {
              if (settings.debug) {
                console.log('Error:', error);
              }
              callback('Erorr contacting database.', null);
            }
          }
        );
      } else {
        callback('No UID provided.', null);
      }
      break;
    case 'question':
      if (params.idHash) {
        db.get(
          'SELECT * from `QUESTIONS` WHERE `idHash`=?',
          [params.idHash],
          (error, row) => {
            if (!error) {
              let res = row;
              res.tags = [{id: 1, label: 'Number Theory'}];
              callback(error, res);
            } else {
              callback(error, null);
            }
          }
        );
      } else {
        callback('No UID provided.', null);
      }
      break;
    case 'session':
      if (params.sessionKey) {
        db.get(
          'SELECT * FROM `SESSIONS` WHERE `idHash`=?',
          [params.sessionKey],
          callback
        );
      } else {
        callback('No session key provided.', null);
      }
      break;
    default:
      break;
  }
};

// TODO
module.exports.update = (table, attribute, value, id, callback) => {
  switch (table) {
    case 'USERS':
      db.run(
        `UPDATE \`USERS\` SET \`${attribute}\`=? WHERE \`id\`=?`,
        [value, id],
        callback
      );
      break;
    default:
      callback('No table given.');
      break;
  }
};

module.exports.create = (type, params, callback) => {
  switch (type) {
    case 'question':
      if (
        params.title &&
        params.content &&
        params.tags &&
        params.level &&
        params.sessionKey
      ) {
        db.get(
          'SELECT COUNT(`id`) AS count, MAX(`id`) AS max FROM `QUESTIONS`',
          (error1, row1) => {
            if (!error1) {
              db.get(
                'SELECT * FROM `SESSIONS` WHERE `idHash`=?',
                [params.sessionKey],
                (error2, row2) => {
                  if (!error2 && row2.uid) {
                    const uid = row2.uid;
                    db.get(
                      'SELECT `id` FROM `Q_LEVELS` WHERE `level`=?',
                      [params.level],
                      (error3, row3) => {
                        if (!error3) {
                          const newQID = row1.count < 1 ? 1 : row1.max + 1;
                          db.run(
                            'INSERT INTO `QUESTIONS` (id, title, content, authorID, levelID, idHash) VALUES (?, ?, ?, ?, ?, ?)',
                            [
                              newQID,
                              params.title,
                              params.content,
                              uid,
                              row3.id,
                              md5(newQID.toString()),
                            ],
                            (error4) => {
                              if (!error4) {
                                const newRoute = `/post/${md5(
                                  newQID.toString()
                                )}`;
                                callback(null, newRoute);
                              } else {
                                callback(
                                  'Error adding new question: ' + error4,
                                  null
                                );
                              }
                            }
                          );
                        } else {
                          if (settings.debug) {
                            console.log('Error getting level name:', error3);
                          }
                        }
                      }
                    );
                  } else {
                    if (settings.debug) {
                      console.log(
                        'Error getting session information from the database:',
                        error2
                      );
                    }
                  }
                }
              );
            } else {
              if (settings.debug) {
                console.log('Error getting user ID count and max:', error1);
              }
            }
          }
        );
      } else {
        callback('Required parameters missing to add new question', null);
      }
      break;
    case 'answer':
      break;
    case 'user':
      if (
        params.name &&
        params.username &&
        params.secQ &&
        params.secA &&
        params.password &&
        params.email
      ) {
        db.get(
          'SELECT COUNT(`id`) AS count, MAX(`id`) AS max FROM `USERS`',
          (error, row) => {
            if (!error) {
              const newUID = row.count < 1 ? 1 : row.max + 1;
              db.run(
                'INSERT INTO `USERS` (`id`, `name`, `username`, `password`, `secQ`, `secA`,' +
                  ' `email`) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [
                  newUID,
                  params.name,
                  params.username,
                  params.password,
                  params.secQ,
                  params.secA,
                  params.email,
                ],
                callback
              );
            } else {
              if (settings.debug) {
                console.log('Error getting user ID count and max:', error);
              }
            }
          }
        );
      }
      break;
    case 'tag':
      break;
    case 'session':
      if (params.uid) {
        db.get(
          'SELECT COUNT(`id`) AS count, MAX(`id`) as max FROM `SESSIONS`',
          (error1, row) => {
            if (!error1) {
              const newSessID = row.count < 1 ? 1 : row.max + 1;
              const newSessionKey = sha256(
                newSessID.toString() + params.uid.toString()
              );
              db.run(
                'INSERT INTO `SESSIONS` (id, uid) VALUES (?, ?)',
                [newSessID, params.uid],
                (error2) => {
                  if (!error2) {
                    callback(error2, newSessionKey);
                  } else {
                    callback(error2, null);
                  }
                }
              );
            } else {
              if (settings.debug) {
                console.log('Error getting session ID count and max:', error1);
              }
            }
          }
        );
      } else {
        callback('No UID provided.', null);
      }
      break;
    default:
      break;
  }
};

module.exports.delete = (type, params, callback) => {
  switch (type) {
    case 'question':
      break;
    case 'answer':
      break;
    case 'user':
      break;
    case 'tag':
      break;
    case 'session':
      break;
    default:
      break;
  }
};

module.exports.demo = () => {
  module.exports.init();
  const demoUsers = [
    {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
      password: 'Bret',
      secQ: 'Whats your favourite animal',
      secA: 'Dog',
    },

    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv',
      password: 'Antonette',
      secQ: 'Whats favourite food',
      secA: 'Rice',
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      username: 'Samantha',
      email: 'Nathan@yesenia.net',
      password: 'Samantha',
      secQ: 'Whats your favourite colour',
      secA: 'Blue',
    },
    {
      id: 4,
      name: 'Patricia Lebsack',
      username: 'Karianne',
      email: 'Julianne.OConner@kory.org',
      password: 'Karianne',
      secQ: 'Whats your mothers maiden name',
      secA: 'Gina',
    },
    {
      id: 5,
      name: 'Chelsey Dietrich',
      username: 'Kamren',
      email: 'Lucio_Hettinger@annie.ca',
      password: 'Kamren',
      secQ: 'Whats the best day of the week',
      secA: 'Friday',
    },
  ];
};
