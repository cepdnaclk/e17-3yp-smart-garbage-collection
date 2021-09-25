const express = require('express');
const db = require("../connection");
const Router = express.Router();

Router.post("/", async function (req, res) {


    const username = req.body.adminusername;
    const password = req.body.adminpassword;

    db.query("SELECT * FROM admin WHERE username = ? AND password = ?",
        [username, password],
        (err, result) => {
            if (err) {
                res.send({ err: err });

            }
            if (result.length > 0) {
                res.send({ message: 'successful' });
                console.log(result);
            }
            else {
                res.send({ message: "failed" });

            }
        });
});

module.exports = Router;