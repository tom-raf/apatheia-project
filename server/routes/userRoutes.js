const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const { deleteUser } = require('../controllers/userController');

router.delete('/delete', verifyToken, deleteUser);

module.exports = router;
