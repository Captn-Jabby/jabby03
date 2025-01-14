const express = require('express')
const app = express()
const axios = require('axios');
app.set('view engine', 'ejs')
const port = 3000
app.use(express.urlencoded({ extended: true }));
const con = require("./database/config")

app.get('/', (req, res) => {
  con.query("SELECT * FROM products", (err, results) => {
    if (err) {
      console.error(err)
      res.status(500).send('Error fetching data')
    } else {
      res.render('index', { products: results })
    }
  })
})

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send('Error fetching data')
})


app.post("/addProduct", (req, res) => {

  const { name, price, description, qty } = req.body;
  const query = "INSERT INTO products SET ?";
  con.query(query, { name, price, description, qty }, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error adding product');
    } else {
      res.redirect('/');
    }
  });
});

app.get('/products', (req, res) => {
  con.query("SELECT * FROM products", (err, results) => {
    if (err) {
      console.error(err)
      res.status(500).send('Error fetching data')
    } else {
      res.json(results)
    }
  })
})

app.get('/products/:id', (req, res) => {
  const productId = req.params.id;
  con.query("SELECT * FROM products WHERE id = ?", productId, (err, results) => {
    if (err) {
      console.error(err)
      res.status(500).send('Error fetching data')
    } else {
      res.json(results[0])
    }
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))