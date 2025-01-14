const express = require('express')
const app = express()
const port = 3000

const con = require("./database/config")
app.use(express.urlencoded({extended:true}))
app.set("view engine", "ejs")
app.use(express.static("public"))

app.get("/", (req, res) => {
    con.query("SELECT * FROM users",(err,result)=>{
        if(err) {
            console.log(err)
        }else{
            res.render("index", {users:result})
        }
    })
})

app.get("/addPage", (req,res)=>{
    res.render("addUser")
})

app.post("/addUser",(req,res)=>{
    const {fullname, gender, bdate} = req.body

    // Validate data (optional)
    if (!fullname || !gender || !bdate) {
        return res.status(400).send("Please fill in all required fields.");
    }

    const sql = `INSERT INTO users (fullname, gender, bdate) VALUES (?, ?, ?)`;

    con.query(sql, [fullname, gender, bdate], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error adding user.");
        } else {
            res.redirect("/");
        }
    });
})
app.get("/delete/:id", (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM users WHERE id = ?`;
    con.query(sql, [id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error deleting user.");
        } else {
            res.redirect("/");
        }
    });
})

app.get("/edit/:id", (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM users WHERE id = ?`;
    con.query(sql, [id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error fetching user.");
        } else {
            res.render("editUser", {user: result[0]});
        }
    });
})

app.post("/edit/:id", (req, res) => {
    const id = req.params.id;
    const {fullname, gender, bdate} = req.body;

    // Validate data (optional)
    if (!fullname || !gender || !bdate) {
        return res.status(400).send("Please fill in all required fields.");
    }

    const sql = `UPDATE users SET fullname = ?, gender = ?, bdate = ? WHERE id = ?`;

    con.query(sql, [fullname, gender, bdate, id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error editing user.");
        } else {
            res.redirect("/");
        }
    });
})

app.get("/getData", (req, res) => {
    const sql = "SELECT * FROM users";
con.query(sql, (err, result) => {
    if(err) {
        res.send(err)
    }else{
       res.send()
    }
})
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))