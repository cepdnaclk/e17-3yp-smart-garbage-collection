const express = require('express');
const db = require("../connection");
const Router = express.Router();
const bcrypt = require('bcrypt');
//const { response } = require('express');
const { createTokens, validateToken } = require('../JWT');

const saultRounds = 10; // for pw hashing

Router.post("/authenticate", async function(req, res) {


    const username = req.body.collectorusername;
    const password = req.body.collectorpassword;

    // if username and password is not entered
    //if (username == '' && password == '') res.send({ message: 'Please enter both username & password' })

    //else {

    db.query("SELECT * FROM collector WHERE username = ?",
        username,
        (err, result) => {
            if (err) {
                res.send({ err: err });

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
                    } else {
                        res.send({ error: "Incorrect password" });

                    }
                })
            } else {
                res.send({ message: "User doesn't exist" });

            }
        });

    //}


});

module.exports = Router;