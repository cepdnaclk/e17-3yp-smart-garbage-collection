const express = require('express');
const db = require("../connection");

const Router = express.Router();

Router.post("/", async function (req, res) {

    const fname = req.body.adminfname;
    const lname = req.body.adminlname;
    const username = req.body.adminusername;
    const password = req.body.adminpassword;

    db.query("INSERT INTO admin (fname, lname, username, password) VALUES (?,?,?,?)",
        [fname, lname, username, password],
        (err, result) => {
            console.log(err);
        });
});

module.exports = Router;