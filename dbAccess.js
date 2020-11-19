const sqlite3 = require('sqlite3').verbose();
 
function connect() {
    let db = new sqlite3.Database('./db/database.sqlite', (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to the SQlite database.');
    });
    return db;
}

function init(db) {
    db.run('CREATE TABLE IF NOT EXISTS messages(id integer primary key autoincrement, message text,user text,created TEXT DEFAULT CURRENT_TIMESTAMP)', (err) => { if (err) { console.log(err) } else { console.log("Creating Table") } }

    );
}

function scrap(db) {
    db.run('DROP TABLE messages', (err) => {
        if (err) { console.log("error") }
        else { console.log("Scrapping Table") }
    });
    init(db)
}

function addMessage(db, newMessage, username) {
    db.serialize(() => {
        db.run(`INSERT INTO messages(message,user) VALUES(?,?)`, [newMessage, username], function (err) {
            if (err) {
                return console.log(err.message);
            }
            console.log(`${newMessage} inserted by ${username} at rowId ${this.lastID}`);
        });
    });
}


function readMessages(db, req, res) {
    db.all(`SELECT * from messages`, (err, rows) => {
        if (err) {
            console.error(err.message);
        }
        if (!rows) {
            res.send({ error: "no messages found" })
        }
        let obj = { msgs: {} }
        rows.forEach(row => { obj.msgs[row.id] = { ...row } })
        console.log(obj)
        res.send(obj);
    })
}

function close() {
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Closing the database connection.');
    });
}

function readUserMessages(db, req, res) {
    console.log(`Getting messages for user ${req.params.user}`)
    db.all(`SELECT * from messages where user="${req.params.user}"`, (err, rows) => {
        if (err) {
            console.error(err.message);
        }
        console.log(rows)
        if (!rows.length) {
            res.send({ error: "no messages found" })
        } else {
            let obj = {}
            rows.forEach(row => { obj[row.id] = { ...row } })
            console.log(obj)
            res.send(obj);
        }
    })
}

module.exports = { connect, addMessage, readMessages, readUserMessages, close, scrap }