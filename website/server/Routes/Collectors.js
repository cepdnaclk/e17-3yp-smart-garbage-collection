const express = require('express');
const db = require("../connection");
const Router = express.Router();

// get collectors id + first name + last name
Router.get("/", (req, res) => {

    db.query("SELECT id, fname, lname FROM collector", [], (err, result) => {
        if (err) res.send({ err: err })
        else {
            res.send(result);
            //res.send(result[0].category);
        }
    });
});

module.exports = Router;