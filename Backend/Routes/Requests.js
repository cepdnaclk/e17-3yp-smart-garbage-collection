const express = require('express');
const db = require("../connection");
const Router = express.Router();

// get all requests
Router.get("/getAll", (req, res) => {

    db.query("SELECT * FROM assign", (err, result) => {
        if (err) res.send({ err: err })
        else {
            res.send(result);
            //res.send(result[0].category);
        }
    });
});


// add a request
Router.post("/add", (req, res) => {

    const adminId = req.body.adminId;
    const collectorId = req.body.collectorId;
    const binId = req.body.binId;
    const status = 'Sent';
    const time = req.body.time;

    db.query("INSERT INTO assign (admin_id, bin_id, collector_id, status, time) VALUES (?,?,?,?,?)",
        [adminId, binId, collectorId, status, time], (err, result) => {
            if (err) res.send({ err: err })
            else {
                res.send({ message: 'Request sent succesfully' });
            }
        });

});


// clear requests table - clears all (even incompleted ones) -> correct later
Router.delete("/clearAll", (req, res) => {

    db.query("TRUNCATE TABLE assign", (err, result) => {
        if (err) res.send({ err: err });
        else {
            res.send({ message: 'All requests cleared' });
        }
    });
});




module.exports = Router;