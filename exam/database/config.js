const mysql = require('mysql2');

const con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "exam"
});

con.connect(function(err) {
         if (err) throw err;
        console.log("DB Connected");
});

module.exports = con;