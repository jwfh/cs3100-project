const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const spawn = require("child_process").spawn
const crypto = require('crypto');
const md5hash = crypto.createHash('md5');
md5hash.setEncoding('hex');

/* 
 * The MD5 hash of the DB init file. This is set by the Makefile before 
 * the app starts and is validated each time a connection is made to the 
 * database.
 */
const initHash = '094755635dd169d046ddc8f8d25887be';

const dbFile = __dirname + '/../numhub.db';

const db = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
      console.error(err.message);
      process.exit(1);
    }
    console.log('Connected to the NumHub database.');
    initializeDB();
});

function initializeDB() {
    // Verify that the init file has not been tampered with since the app started
    const initFile = './init.sql';
    const fd = fs.createReadStream(initFile);
    fd.on('end', function() {
        md5hash.end();
        if (md5hash.read() == initHash) {
            console.log('SQL init file passed verification. Executing...');
            var child = spawn("sqlite3", [dbFile]);
            fs.createReadStream(initFile).pipe(child.stdin);
            console.log('SQL database initialization complete.');
        }
        else {
            console.log('SQL init file did not pass verification. Exiting...');
            process.exit(1);
        }
    });
    fd.pipe(md5hash);
}

module.exports.test = function() {
	console.log('In test().');
}
