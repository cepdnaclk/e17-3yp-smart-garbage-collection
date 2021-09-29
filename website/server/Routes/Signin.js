const express = require('express');
const db = require("../connection");
const Router = express.Router();
const bcrypt = require('bcrypt');
//const { response, application } = require('express');
const { createTokens, validateToken } = require('../JWT')

const saultRounds = 10; // for pw hashing

Router.post("/", async function (req, res) {


    const username = req.body.adminusername;
    const password = req.body.adminpassword;

    db.query("SELECT * FROM admin WHERE username = ?",
        username,
        (err, result) => {
            if (err) {
                res.send({ error: err });

            }
            if (result.length > 0) {

                bcrypt.compare(password, result[0].password).then((match) => {
                    if (match) {
                        const accessToken = createTokens(result[0]);
                        res.cookie("access-token", accessToken, {
                            maxAge: 60 * 60 * 1 * 1000,
                            httpOnly: true // to save from attackers taking the token

                        });

                        // cookie expire 1 hours 
                        res.send({ message: 'successful' });

                        // send the acess token to the front end
                        //res.json(accessToken);
                    }
                    else {
                        res.send({ error: "Incorrect password" });

                    }
                })
            }
            else {
                res.send({ error: "User doesn't exist" });

            }
        });

});



module.exports = Router;