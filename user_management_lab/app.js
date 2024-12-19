const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Static files
app.use(express.static('public'));

// Routes
app.use('/', require('./routes/userRoutes'));  // Mounting the userRoutes

// Server setup
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
