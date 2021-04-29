const express = require('express');
const router = express.Router();

//import routers to route to
const userRoute = require('./user.js');

//returns home page
router.get('/', (req, res) => {
    res.send("Voucher_Service home page")
});

//routes to required routers
router.use('/user', userRoute);



// catch 404 and forward to error handler
router.use("/", (req, res, next) => {
    const err = new Error('Not Found');
    res.status = 404;
    err.status = 404;
    res.send("404 " + req.path + " not found");
    next(err);
});


//exports this router for use in server.js
module.exports = router;