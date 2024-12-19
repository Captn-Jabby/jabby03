// userController.js
const mysql = require('mysql2');

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'user_management',
});


exports.getUsers = (req, res) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.render('index', { users: results });
    });
};

exports.getInsertUserPage = (req, res) => {
    res.render('insert-user');
};


exports.addUser = (req, res) => {
    const { fullname, gender, bdate } = req.body;
    const query = 'INSERT INTO users (fullname, gender, bdate) VALUES (?, ?, ?)';
    db.query(query, [fullname, gender, bdate], (err) => {
        if (err) throw err;
        res.redirect('/');
    });
};


exports.getEditUserPage = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM users WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) throw err;
        if (!results.length) return res.status(404).send('User not found');
        res.render('edit-user', { user: results[0] });
    });
};



// userController.js
exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { fullname, gender, bdate } = req.body;
    const query = 'UPDATE users SET fullname = ?, gender = ?, bdate = ? WHERE id = ?';

    db.query(query, [fullname, gender, bdate, id], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error updating user');
        }

        res.redirect('/');  // Redirecting to the home page after successful update
    });
};


exports.deleteUser = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM users WHERE id = ?';
    db.query(query, [id], (err) => {
        if (err) throw err;
        res.json({ success: true });
    });
};
