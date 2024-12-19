const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('routes/userRoutes');


const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// View Engine
app.set('view engine', 'ejs');

// Routes
app.use('/', userRoutes);

// Start server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
