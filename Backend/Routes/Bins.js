const express = require('express');
const db = require("../connection");
const Router = express.Router();
const { validateToken } = require('../JWT')

Router.get("/get", validateToken, (req, res) => {

    //Router.get("/get", (req, res) => {


    db.query("SELECT * FROM bin", (err, result) => {
        if (err) res.send({ error: err })
        else {
            res.send(result);
            //res.send(result[0].category);
        }
    });
});

// get bins by unit id
Router.get("/getByUnitId", (req, res) => {

    const id = req.query.unitID;

    db.query("SELECT * FROM bin WHERE unit_id = ?", id, (err, result) => {
        if (err) res.send({ error: err })
        else {
            res.send(result);
            //res.send(result[0].category);
        }
    });
});


module.exports = Router;