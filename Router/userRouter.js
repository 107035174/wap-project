const express = require('express');
const userController = require('../Controller/userController');

const router = express.Router();

router.get('/', userController.getUsers);

router.post('/', userController.login)

module.exports = router;