const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const { authenticateToken } = require("../utils/jwtTokens");

router.post('/signup', (req, res) => {
    userController.addUser(req, res);
});


router.post('/login', (req, res) => {
    userController.login(req, res);
});


//get a user's information using their provided authentication token
router.get('/get', authenticateToken, (req, res) => {
    userController.getUser(req, res);
});



router.post("/addBiller", (req, res) => {
    userController.addBillerInfo(req, res);
});

//TODO: update biller and update personal


module.exports = router;