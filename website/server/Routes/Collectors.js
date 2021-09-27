const express = require('express');
const db = require("../connection");
const Router = express.Router();

// get collectors id + first name + last name
Router.get("/", (req, res) => {

    db.query("SELECT id, fname, lname FROM collector", (err, result) => {
        if (err) res.send({ err: err })
        else {
            res.send(result);
            //res.send(result[0].category);
        }
    });
});

// get collector name by bin id in the assign table
// only if the request is in sent or accepted statuses 
// (not in declined or completed)
Router.get("/getByBinId", (req, res) => {

    // initially get the collector id
    const binId = req.query.binId;

    db.query("SELECT collector_id FROM assign WHERE bin_id = ? AND (status = 'Sent' OR status = 'Accepted')",
        binId, (err, result) => {
            if (err) res.send({ err: err })
            else {
                //res.send(result);

                // get the corresponding collector name
                let collectorId = result[0].collector_id;

                db.query("SELECT fname, lname FROM collector WHERE id = ?",
                    collectorId, (err, result) => {
                        if (err) res.send({ err: err })
                        else {
                            res.send(result);
                        }
                    });
            }
        });
});

module.exports = Router;