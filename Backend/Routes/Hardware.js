const express = require('express');
const db = require("../connection");
const Router = express.Router();
const { criteriaTasks } = require('../assignAutomation');

// 1. bin color & fill level (green, yellow, red)
// 2. compaction cycles
// 3. Automated assigning (red)
// 4. complete task (when red becomes -> zero or lower than some value request status must be changed to completed) ***NOT SURE

// 1. bin color & fill level (green, yellow, red)
Router.put("/update/bin", (req, res) => {

    const id = req.query.binId;
    const fillLevel = req.query.binFillLevel;
    const color = req.query.binColor;

    // check if a bin exists with the given id
    db.query("SELECT * FROM bin WHERE id = ?", id, (err, result) => {
        if (err) {
            res.status(400).send({ error: err });
        }
        if (result.length > 0) {
            db.query("UPDATE bin SET fill_level = ?, color = ? WHERE id = ?",
                [fillLevel, color, id], (err, result) => {
                    if (err) res.status(400).send({ error: err });
                    else {
                        res.send({ message: 'Color & fill level updated' })
                    }
                });

        }
        else {
            res.status(400).send({ error: "Invalid bin Id" })
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
            res.status(400).send({ error: err });
        }
        if (result.length > 0) {
            db.query("UPDATE bin SET compaction_cycles = ? WHERE id = ?",
                [compaction, id], (err, result) => {
                    if (err) res.status(400).send({ error: err });
                    else {
                        res.send({ message: 'Compaction updated' })
                    }
                });

        }
        else {
            res.status(400).send({ error: "Invalid bin Id" })
        }
    })


});


// 3. Automated assigning (red)

// ASSIGNING AUTOMATION ALGORITHM

// steps for criteria 1

// a) take max_tasks from db
// b) take the list of collectors with id & tasks from db
// c) create a list of eligible collectors
//      - calculate tasks/max_tasks for each collector
//      - take the ones with min value

// steps for criteria 2

// a) take coordinates of eligible collectors from db
// b) take the unit_id of the bin from db
// c) take coordinates of that unit
// d) calculate distances using geometry library google maps 
// e) find the least distance -> nearest collector -> send the request (add to assign table)
// f) if multiple collectors gave same distances -> go for criteria 3

// steps for criteria 3

// a) take the zone of the bin
// b) select a collector of the same zone -> send the request (add to assign table)


Router.post('/assign', (req, res) => {

    const id = req.query.binId;

    // steps for criteria 1
    // take max_tasks from db
    db.query("SELECT max_tasks FROM systemsettings WHERE id = 1", (err, result) => {
        if (err) {
            res.send({ error: err });
        } else {
            const max_tasks = result[0].max_tasks;

            // take the list of collectors with id & tasks from db
            db.query("SELECT id, tasks FROM collector", (err, result) => {
                if (err) {
                    res.send({ error: err });
                } else {
                    let collectors = [];
                    result.map((collector) => {
                        let collectorObj = {
                            "id": collector.id,
                            "tasks": collector.tasks
                        }
                        collectors.push(collectorObj);
                    })

                    // create a list of eligible collectors
                    //let eligibleColIds = criteriaTasks(max_tasks, collectors);
                    console.log(criteriaTasks(max_tasks, collectors));

                }
            })

        }
    })


})

module.exports = Router;