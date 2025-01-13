
const mysql = require('mysql2');

const dbcon = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "bookdb"
});

dbcon.connect(function(err) {
         if (err) throw err;
        console.log("db connected");
});

module.exports = dbcon;