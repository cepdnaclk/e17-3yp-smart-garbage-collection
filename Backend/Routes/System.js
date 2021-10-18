const express = require('express');
const db = require("../connection");
const Router = express.Router();

Router.put("/update/binHeight", (req, res) => {

    const binHeight = req.body.binHeight;

    if (binHeight != '') {
        db.query("UPDATE systemsettings SET bin_height = ? WHERE id = 1",
            binHeight, (err, result) => {
                if (err) res.send({ error: err });
                else {
                    res.send({ message4: 'Bin height updated' })
                }
            });
    }
});

Router.put("/update/lowBound", (req, res) => {

    const low_bound = req.body.low_bound;

    if (low_bound != '') {
        db.query("UPDATE systemsettings SET low_bound = ? WHERE id = 1",
            low_bound, (err, result) => {
                if (err) res.send({ error: err });
                else {
                    res.send({ message4: 'Low bound updated' })
                }
            });
    }

});

Router.put("/update/highBound", (req, res) => {

    const high_bound = req.body.high_bound;

    if (high_bound != '') {
        db.query("UPDATE systemsettings SET high_bound = ? WHERE id = 1",
            high_bound, (err, result) => {
                if (err) res.send({ error: err });
                else {
                    res.send({ message4: 'High bound updated' })
                }
            });
    }

});

Router.get("/getBinHeight", (req, res) => {


    db.query("SELECT bin_height FROM systemsettings WHERE id = 1", (err, result) => {
        if (err) res.send({ error: err })
        else {
            res.send(result);
            //res.send(result[0].category);
        }
    });
});

Router.get("/getLowBound", (req, res) => {


    db.query("SELECT low_bound FROM systemsettings WHERE id = 1", (err, result) => {
        if (err) res.send({ error: err })
        else {
            res.send(result);
            //res.send(result[0].category);
        }
    });
});

Router.get("/getHighBound", (req, res) => {


    db.query("SELECT high_bound FROM systemsettings WHERE id = 1", (err, result) => {
        if (err) res.send({ error: err })
        else {
            res.send(result);
            //res.send(result[0].category);
        }
    });
});

Router.get("/getCoordinates", (req, res) => {
    db.query("SELECT latitude, longitude FROM systemsettings WHERE id = 1", (err, result) => {
        if (err) res.send({ error: err })
        else {
            res.send(result);
            //res.send(result[0].category);
        }
    });

});


module.exports = Router;