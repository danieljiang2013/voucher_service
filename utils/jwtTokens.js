//from https://medium.com/@therealchrisrutherford/nodejs-authentication-with-passport-and-jwt-in-express-3820e256054f
const jwt = require("jsonwebtoken");

if (process.env.NODE_ENV !== 'production') require('dotenv').config({ path: "../.env" });


const SECRET = process.env.SECRET

const generateToken = (payload) => {
    return jwt.sign(payload, SECRET, { expiresIn: '60m' })
};

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers[`authorization`];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401) // if there isn't any token

    jwt.verify(token, SECRET, (err, user) => {
        if (err) {
            console.log("token no auth");
            return res.sendStatus(403)
        }
        req.user = user
        console.log("valid token, passing request");
        next() // pass the execution off to whatever request the client intended
    })
}

module.exports.generateToken = generateToken;
module.exports.authenticateToken = authenticateToken;