const express = require('express');
const db = require("../connection");
const Router = express.Router();


// DID NOT WORK //////////////////////////////////////////////
Router.put("/update", (req, res) => {

    // system id is 1
    const id = 1;
    const binHeight = req.body.binHeight;
    const redRange = req.body.redRange;
    const yellowRange = req.body.yellowRange;
    const greenRange = req.body.greenRange;

    // if nothing entered
    if (binHeight === '' && redRange === '' && yellowRange === '' && greenRange === '') {
        res.send({ message: 'No data entered for updation' })
    }

    else {

        // update bin height
        if (binHeight != '') {
            db.query("UPDATE system SET bin_height = ? WHERE id = ?",
                [binHeight, id], (err, result) => {
                    if (err) res.send({ err: err });
                    else {
                        res.send({ message1: 'Bin height updated' })
                    }
                })

        }

        // update red range
        if (redRange != '') {
            db.query("UPDATE system SET red_range = ? WHERE id = ?",
                [redRange, id], (err, result) => {
                    if (err) res.send({ err: err });
                    else {
                        res.send({ message2: 'Red range updated' })
                    }
                })
        }

        // update yellow range
        if (yellowRange != '') {
            db.query("UPDATE system SET yellow_range = ? WHERE id = ?",
                [yellowRange, id], (err, result) => {
                    if (err) res.send({ err: err });
                    else {
                        res.send({ message3: 'yellow range updated' })
                    }
                })
        }

        // update green range
        if (greenRange != '') {
            db.query("UPDATE system SET green_range = ? WHERE id = ?",
                [greenRange, id], (err, result) => {
                    if (err) res.send({ err: err });
                    else {
                        res.send({ message4: 'green range updated' })
                    }
                })
        }

    }
});

module.exports = Router;