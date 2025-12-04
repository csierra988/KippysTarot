const express = require('express');
const router = express.Router();

//importing user controller logic
const usersController = require('../controllers/usersController');

//getting users
router.get('/', usersController.getUsers);

//adding a new user
router.post('/', usersController.addUser);

module.exports = router;
