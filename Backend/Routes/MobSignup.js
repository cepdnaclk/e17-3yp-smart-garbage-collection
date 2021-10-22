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
                //db.query("SELECT a.request_id,a.admin_id,a.time,b.fname,b.lname,c.location FROM assign a,admin b,unit c,bin d WHERE a.admin_id=b.id && a.status='Sent' && a.bin_id=d.id && d.unit_id=c.id && a.collector_id = ?", collector_id, (err, result) => {
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
    // }
});

module.exports = router;