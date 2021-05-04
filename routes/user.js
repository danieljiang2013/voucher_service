const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');


router.post('/signup', (req, res) => {
    userController.addUser(req, res);
});


router.post('/login', (req, res) => {
    userController.login(req, res);
});

module.exports = router;