const express = require('express');
const db = require("../connection");
const Router = express.Router();
const bcrypt = require('bcrypt');
//const { response } = require('express');

const saultRounds = 10; // for pw hashing

Router.post("/", async function(req, res) {


    const username = req.body.collectorusername;
    const password = req.body.collectorpassword;

    // if first name is not entered
    if (username == '' || password == '') res.send({ message: 'Please enter both username & password' })

    else {

        db.query("SELECT * FROM collector WHERE username = ?",
            username,
            (err, result) => {
                if (err) {
                    res.send({ err: err });

                }
                if (result.length > 0) {
                    bcrypt.compare(password, result[0].password, (error, response) => {
                        if (response) {

                            res.send({ message: 'succesful' });
                        } else {
                            res.send({ message: 'Incorrect password' });
                        }
                    })
                } else {
                    res.send({ message: "User doesn't exist" });

                }
            });

    }


});

module.exports = Router;