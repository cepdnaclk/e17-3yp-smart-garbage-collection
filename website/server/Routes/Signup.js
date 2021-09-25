const express = require('express');
const db = require("../connection");
const bcrypt = require('bcrypt');
const Router = express.Router();

const saultRounds = 10; // for pw hashing

Router.post("/", async function (req, res) {

    const fname = req.body.adminfname;
    const lname = req.body.adminlname;
    const username = req.body.adminusername;
    const password = req.body.adminpassword;

    // if first name is not entered
    if (fname == '' && lname == '') res.send({ message: 'Please enter your name' })

    // if username or passowrd is not entered
    else if ((username == '' || password == '')) res.send({ message: 'Username or Password is missing' });

    else {

        // checking if username already exists
        db.query("SELECT * FROM admin WHERE username = ?",
            [username],
            (err, result) => {
                if (err) {
                    res.send({ err: err });
                    //console.log(err);
                }
                if (result.length > 0) {
                    res.send({ message: 'Username already exists' });
                    //console.log(result);
                }
                else {

                    // succesfull signup 

                    // hash password
                    bcrypt.hash(password, saultRounds, (err, hash) => {

                        if (err) console.log(err);

                        db.query("INSERT INTO admin (fname, lname, username, password) VALUES (?,?,?,?)",
                            [fname, lname, username, hash],
                            (err, result) => {
                                if (err) {
                                    res.send({ err: err });
                                    //console.log(err);
                                }
                                else {
                                    res.send({ message: 'successful' });

                                }

                            });


                    })



                }
            });
    }


});

module.exports = Router;