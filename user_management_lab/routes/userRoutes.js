// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes for users
router.get('/', userController.getUsers);  // Home page
router.get('/insert-user', userController.getInsertUserPage);  // Add user page
router.post('/add-user', userController.addUser);  // Add user
router.get('/edit-user/:id', userController.getEditUserPage);  // Edit user page
router.put('/edit-user/:id', userController.updateUser);  // Update user
router.delete('/delete-user/:id', userController.deleteUser);  // Delete user

module.exports = router;
