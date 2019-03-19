const sqlite3 = require('sqlite3').verbose();
const crypto = require('crypto');
const md5hash = crypto.createHash('md5');
md5hash.setEncoding('hex');

const dbFile = __dirname + '/../numhub.db';

const db = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error(err.message);
    process.exit(1);
  }
  module.exports.init();
  console.log('Connected to the NumHub database...');
});

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
      \`admin\` INT NOT NULL DEFAULT 0,
      \`active\` INT NOT NULL DEFAULT 1,
      \`lockout_count\` INT DEFAULT 0,
      \`sec_q1\` INT NOT NULL,
      \`sec_a1\` VARCHAR(255) NOT NULL,
      \`sec_q2\` INT NOT NULL,
      /* Need some way to enforce that sec_q1 != sec_q2. */
      \`sec_a2\` VARCHAR(255) NOT NULL,
      UNIQUE(\`username\`),
      FOREIGN KEY (\`sec_q1\`) REFERENCES \`SEC_Q\`(\`id\`),
      FOREIGN KEY (\`sec_q2\`) REFERENCES \`SEC_Q\`(\`id\`)
    )`);
    console.log('Created user table...');
    db.run(`\
    /* Table of past user password hashes. */
    CREATE TABLE IF NOT EXISTS \`PASSWORDS\` (
      \`id\` INT AUTO_INCREMENT NOT NULL,
      \`user_id\` INT NOT NULL,
      \`hash\` CHAR(130) NOT NULL,
      \`time_changed\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (\`user_id\`) REFERENCES \`USERS\`(\`id\`)
    )`);
    console.log('Created passwords table...');
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
      \`author_id\` INT NOT NULL,
      \`q_id\` INT NOT NULL,
      \`q_rev_id\` INT NOT NULL DEFAULT 0,
      \`q_text\` TEXT NOT NULL,
      \`q_level_id\` INT NOT NULL,
      \`post_time\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (\`author_id\`) REFERENCES \`USERS\`(\`id\`),
      FOREIGN KEY (\`q_level_id\`) REFERENCES \`Q_LEVELS\`(\`id\`)
    )`);
    console.log('Created question table...');
    db.run(`\
    /* Table of question answers. */
    CREATE TABLE IF NOT EXISTS \`ANSWERS\` (
      \`id\` INT AUTO_INCREMENT PRIMARY KEY,
      \`author_id\` INT NOT NULL,
      \`q_id\` INT NOT NULL,
      \`a_text\` TEXT NOT NULL,
      \`post_time\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (\`author_id\`) REFERENCES \`USERS\`(\`id\`),
      FOREIGN KEY (\`q_id\`) REFERENCES \`QUESTIONS\`(\`q_id\`)
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
      \`q_id\` INT NOT NULL,
      \`q_tag_id\` INT NOT NULL,
      FOREIGN KEY (\`q_id\`) REFERENCES \`QUESTIONS\`(\`id\`),
      FOREIGN KEY (\`q_tag_id\`) REFERENCES \`TAGS\`(\`id\`)
    )`);
    console.log('Created tag association table...');
    db.run(`\
    /* Table for to facilitate URL shortening (for sharing link feature). */
    CREATE TABLE IF NOT EXISTS \`URLS\` (
      \`id\` INT AUTO_INCREMENT PRIMARY KEY,
      \`url_leaf\` VARCHAR(10),
      \`redirect_q_id\` INT NOT NULL,
      \`redirect_a_id\` INT DEFAULT NULL
    )`);
    console.log('Created URL shortener table...');
  });

  [
    {
      table: 'TAGS',
      field: 'tag',
      values: [
        'Geometry',
        'Number Theory',
        'Algebra',
        'Calculus',
        'Analysis',
      ],
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
  ].map((data, i) =>{
    data.values.map((text, index) => {
      db.serialize(() => {
        db.all(`SELECT * FROM \`` + data.table + `\` WHERE \`` + data.field + `\`=?`, [text], (err, rows) => {
          if (err) {
            console.log('[' + __filename + ']', 'Error searching', data.field, 'in', data.table, 'for', text, err);
          } else if (rows.length === 0) {
            console.log('Adding', text, 'to', data.table);
            db.run(`INSERT INTO \`` + data.table + `\` (\`id\`, \`` + data.field + `\`) VALUES (?, ?)`, [index, text], (err) => {
              if (err) {
                console.log('[' + __filename + ']', 'Error adding new', data.field, 'to', data.table, 'with value', text, err);
              }
            });
          }
        });
      });
    });
  });
};

module.exports.all = (type, cb) => {
  switch (type) {
    case 'tag':
      db.all(`SELECT \`id\`,\`tag\` from \`TAGS\``, (err, rows) => {
        if (err) {
          console.log('[' + __filename + ']', 'Error retrieving tags:', err);
          cb(err);
        } else {
          cb(rows);
        }
      });
      break;
    case 'level':
      db.all(`SELECT \`id\`,\`level\` from \`Q_LEVELS\``, (err, rows) => {
        if (err) {
          console.log('[' + __filename + ']', 'Error retrieving levels:', err);
          cb(err);
        } else {
          cb(rows);
        }
      });
      break;
    default:
      return null;
  }
};

module.exports.demo = () => {
  module.exports.init();
  console.log('Add demo rows here...');
};
