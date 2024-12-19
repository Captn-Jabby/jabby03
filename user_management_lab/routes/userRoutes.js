const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes
router.get('/', userController.getUsers);
router.get('/insert-user', userController.getInsertUserPage);
router.post('/add-user', userController.addUser);
router.put('/edit-user/:id', userController.updateUser);
router.delete('/delete-user/:id', userController.deleteUser);

module.exports = router;
