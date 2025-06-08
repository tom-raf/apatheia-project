const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const { deleteUser, updateUserName, updateUsername, updatePassword } = require('../controllers/userController');

router.delete('/', verifyToken, deleteUser);
router.put('/update-name', verifyToken, updateUserName);
router.put('/update-username', verifyToken, updateUsername);
router.put('/update-password', verifyToken, updatePassword);


module.exports = router;
