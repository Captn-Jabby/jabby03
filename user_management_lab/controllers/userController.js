const mysql = require('mysql2');

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Replace with your MySQL password
    database: 'user_management',
});

// Render index page with users
exports.getUsers = (req, res) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.render('index', { users: results });
    });
};

// Render insert-user page
exports.getInsertUserPage = (req, res) => {
    res.render('insert-user');
};

// Add a new user
exports.addUser = (req, res) => {
    const { fullname, gender, bdate } = req.body;
    const query = 'INSERT INTO users (fullname, gender, bdate) VALUES (?, ?, ?)';
    db.query(query, [fullname, gender, bdate], (err) => {
        if (err) throw err;
        res.redirect('/');
    });
};

// Update user
exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { fullname, gender, bdate } = req.body;
    const query = 'UPDATE users SET fullname = ?, gender = ?, bdate = ? WHERE id = ?';
    db.query(query, [fullname, gender, bdate, id], (err) => {
        if (err) throw err;
        res.json({ success: true });
    });
};

// Delete user
exports.deleteUser = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM users WHERE id = ?';
    db.query(query, [id], (err) => {
        if (err) throw err;
        res.json({ success: true });
    });
};
