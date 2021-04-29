const bcrypt = require("bcryptjs");
const emailValidator = require("email-validator");
const mongoose = require("mongoose");

const userModel = mongoose.model("users");

const { generateToken, authenticateToken } = require("../utils/jwtTokens");

// add a new user to the database

const addUser = (req, res) => {


    //check that required fields are present
    console.log("adding user");
    if (
        !req.body.email ||
        !req.body.password ||
        !req.body.firstName ||
        !req.body.lastName ||
        !req.body.phoneNumber
    ) {
        res.status(400);
        res.send("Sign up failed, missing fields");
        return;
    }

    //check that password is long enough
    if (req.body.password.length < 8) {
        res.send("password too short");
        return;
    }

    const newUser = {
        firstName: req.body.email,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,

    }

    //hash the password with 10 salt rounds and add the new user to the database
    bcrypt.hash(req.body.password, 10, (err, hash) => {

        newUser.password = hash;

        const data = new userModel(newUser);

        data.save(function (err, newuser) {

            let errmsg = "There was a problem processing your data, please submit again";
            if (err) {

                if (err.keyValue && Object.keys(err.keyValue) && Object.keys(err.keyValue)[0]) {
                    errmsg = "Signup failed - this " + Object.keys(err.keyValue)[0] + " is already in use."
                }
                if (err.errors) {
                    errmsg = "Signup failed - the email address you provided was invalid"
                }
                res.send(errmsg)
            }

            else {
                var newid = newuser._id;
                res.send("successfully created new user");
            }


        });


    });
}
module.exports.addUser = addUser;