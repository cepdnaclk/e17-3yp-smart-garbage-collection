const express = require('express');
const db = require("../connection");
const Router = express.Router();

Router.get("/get", (req, res) => {

    db.query("SELECT * FROM bin", (err, result) => {
        if (err) res.send({ err: err })
        else {
            res.send(result);
            //res.send(result[0].category);
        }
    });
});

// get bins by unit id
Router.get("/getByUnitId", (req, res) => {

    const id = req.body.unitID;

    db.query("SELECT * FROM bin WHERE unit_id = ?", id, (err, result) => {
        if (err) res.send({ err: err })
        else {
            res.send(result);
            //res.send(result[0].category);
        }
    });
});


module.exports = Router;