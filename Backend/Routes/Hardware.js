const express = require('express');
const db = require("../connection");
const Router = express.Router();

// 1. bin color & fill level (green, yellow, red)
// 2. compaction cycles
// 3. Automated assigning (red)

// 1. bin color & fill level (green, yellow, red)
Router.put("/update/bin", (req, res) => {

    const id = req.query.binId;
    const fillLevel = req.query.binFillLevel;
    const color = req.query.binColor;

    // check if a bin exists with the given id
    db.query("SELECT * FROM bin WHERE id = ?", id, (err, result) => {
        if (err) {
            res.send({ error: err });
        }
        if (result.length > 0) {
            db.query("UPDATE bin SET fill_level = ?, color = ? WHERE id = ?",
                [fillLevel, color, id], (err, result) => {
                    if (err) res.send({ error: err });
                    else {
                        res.send({ message: 'Color & fill level updated' })
                    }
                });

        }
        else {
            res.send({ error: "Invalid bin Id" })
        }
    })


});

// 2. compaction cycles
Router.put("/update/binCompaction", (req, res) => {

    const id = req.query.binId;
    const compaction = req.query.binCompactionCycles;

    // check if a bin exists with the given id
    db.query("SELECT * FROM bin WHERE id = ?", id, (err, result) => {
        if (err) {
            res.send({ error: err });
        }
        if (result.length > 0) {
            db.query("UPDATE bin SET compaction_cycles = ? WHERE id = ?",
                [compaction, id], (err, result) => {
                    if (err) res.send({ error: err });
                    else {
                        res.send({ message: 'Compaction updated' })
                    }
                });

        }
        else {
            res.send({ error: "Invalid bin Id" })
        }
    })


});

// 3. Automated assigning (red)

module.exports = Router;