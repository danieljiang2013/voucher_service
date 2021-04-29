const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');


router.post('/signup', (req, res, next) => {
    userController.addUser(req, res, next);
});


module.exports = router;