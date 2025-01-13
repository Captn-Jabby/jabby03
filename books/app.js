const express = require('express')
const app = express()
const port = 3000

const con = require("./database/config")
app.use(express.urlencoded({extended:true}))
app.set("view engine", "ejs")

app.get("/", (req, res) => {
    con.query("SELECT * FROM books",(err,result)=>{
        if(err) {
            console.log(err)
        }else{
            res.render("index", {books:result})
        }
    })
})

app.get("/add", (req,res)=>{
    res.render("addBook")
})

app.post("/addBook", (req,res)=>{
    const {title, year, genre} = req.body;

    // Validate data (optional)
  if (!title || !year || !genre) {
    return res.status(400).send("Please fill in all required fields.");
  }
  const sql = `INSERT INTO books (title, year, genre) VALUES (?, ?, ?)`;
  con.query(sql, [title, year, genre], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error adding book to database.");
    } else {
      res.redirect('/'); // Redirect to the main page after successful insertion
    }
  });
})

app.get('/delete/:id', (req, res) => {
    const bookId = req.params.id; 
  
    const sql = `DELETE FROM books WHERE id = ?`;
    con.query(sql, [bookId], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error deleting book.");
      } else {
        res.redirect('/');
      }
    });
  });

  app.get('/edit/:id', (req, res) => {
    const bookId = req.params.id;
  
    const sql = `SELECT * FROM books WHERE id = ?`;
    con.query(sql, [bookId], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error fetching book data.");
      } else {
        res.render("editBook", { book: result[0] }); 
      }
    });
  });
  
  app.post('/update/:id', (req, res) => {
    const bookId = req.params.id;
    const { title, year, genre } = req.body;
  
    const sql = `UPDATE books SET title = ?, year = ?, genre = ? WHERE id = ?`;
    con.query(sql, [title, year, genre, bookId], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error updating book.");
      } else {
        res.redirect('/');
      }
    });
  });

app.listen(port, () => console.log(`Example app listening on port ${port}!`))