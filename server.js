const express = require('express');
const path = require('path');
const cors = require('cors');


require('dotenv').config();

//connect to database and register schemas
require('./models');


//import index router
const routes = require('./routes/index');

//create express app
const app = express();

//json and urlencoded parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//enable cors
app.use(cors());

//router all traffic to index router
app.use('/api', (req, res, next) => {
    const request_string = "********************* " + req.method + " request to path " + req.path + " ";
    console.log(request_string.padEnd(79, "*"));
    next();
}, routes);




const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;

