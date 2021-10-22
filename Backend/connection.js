const mysql = require('mysql');

// mysql connection
var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    //password: "",
    database: "3yproject",
    //multipleStatements: true
});

db.connect(function (err) {
    if (!err) { console.log("Connected"); } else {
        console.log(err);
        console.log('Connection  Failed');
    }
});

module.exports = db;