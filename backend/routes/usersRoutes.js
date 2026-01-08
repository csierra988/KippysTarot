const express = require('express');
const router = express.Router();

//importing user controller logic
const usersController = require('../controllers/usersController');

//getting users
// router.get('/', usersController.getUsers);

//adding a new user
router.post('/', usersController.addUser);

router.put('/:firebase_uid', usersController.updateUser);

router.delete('/:firebase_uid', usersController.deleteUser);

module.exports = router;
