const db = require('./db');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database( __dirname + '/users.db',
    function(err) {
        if ( !err ) {
            console.log('opened users.db');
            initDB();
        }
        else {
            console.log('can not users.db');
        }
    });

test_users = [
    [ 'abc', jay256('123') ],
    [ 'def', gill256('234') ],
];

function initDB() {
    db.serialize( function() {
        db.run(`
            CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            user TEXT,
            db_pw TEXT
        )`);
        for( let row of test_users ) { 

            db.run('INSERT INTO users(user,db_pw) VALUES(?,?)', row,
               (err) => {
                   if ( err ) {
                       console.log( err );
                   } else {
                       console.log('insert', row );
                   }
               } );
        }
    } );
}