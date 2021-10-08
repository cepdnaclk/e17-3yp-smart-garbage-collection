const express = require('express');
const db = require("../connection");
const bcrypt = require('bcrypt');

const router = express.Router();

const saultRounds = 15; // for pw hashing

router.use(express.json());

router.post('/Signup', function(req, res) {
    const fname = req.body.collectorfname;
    const lname = req.body.collectorlname;
    const username = req.body.collectorusername;
    const password = req.body.collectorpassword;

    //if first name is not entered
    if (fname == '' && lname == '') res.json({ status: 'Please enter your name' })

    else if ((username == '' || password == '')) res.json({ status: 'Username or Password is missing' });

    else {

        // checking if username already exists
        db.query("SELECT * FROM collector WHERE username = ?", [username],
            (err, result) => {
                if (err) {
                    res.send({ err: err });
                    //console.log(err);
                }
                if (result.length > 0) {
                    res.send({ message: 'Username already exists' });
                    //console.log(result);
                } else {

                    // succesfull signup 

                    // hash password
                    bcrypt.hash(password, saultRounds, (err, hash) => {

                        if (err) console.log(err);

                        db.query("INSERT INTO collector (fname, lname, username, password) VALUES (?,?,?,?)", [fname, lname, username, hash],
                            (err, result) => {
                                if (err) {
                                    res.json({ err: err });
                                    //console.log(err);
                                } else {
                                    res.json({ status: 'successful' });

                                }

                            });


                    })



                }
            });
    }
});

module.exports = router;