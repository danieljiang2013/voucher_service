
const setEnv = () => {
    require("dotenv").config({ path: `${__dirname}/./../process.env` });

};

module.exports.setEnv = setEnv;