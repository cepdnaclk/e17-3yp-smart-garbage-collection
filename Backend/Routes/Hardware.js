const express = require('express');
const db = require("../connection");
const Router = express.Router();
const { criteriaTasks, criteriaDistance } = require('../assignAutomation');
const { SphericalUtil } = require('node-geometry-library');

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

// a) take tasks_per_round from db
// b) take the list of collectors with id & tasks from db
// c) create a list of eligible collectors
//      - calculate tasks/tasks_per_round for each collector
//      - take the ones with min value

// steps for criteria 2

// a) take coordinates of eligible collectors from db
// b) take the unit_id of the bin from db
// c) take coordinates of that unit
// d) calculate distances using geometry library google maps 
// e) find the least distance -> nearest collector -> send the request (add to assign table) -> update tasks
// f) if multiple collectors gave same distances -> go for criteria 3

// steps for criteria 3

// a) take the zone of the bin
// b) select a collector of the same zone -> send the request (add to assign table) -> update tasks


Router.post('/assign', (req, res) => {

    const binId = req.query.binId;

    // steps for criteria 1
    // take tasks_per_round from db
    db.query("SELECT tasks_per_round FROM systemsettings WHERE id = 1", (err, result) => {
        if (err) {
            res.send({ error: err });
        } else {
            const tasks_per_round = result[0].tasks_per_round;

            // take the list of collectors with id & tasks from db
            db.query("SELECT id, tasks FROM collector", (err, result) => {
                if (err) {
                    res.send({ error: err });
                } else {
                    let collectors = [];
                    result.map((collector) => {
                        let collectorObj = {
                            "id": collector.id,
                            "rounds": Math.floor(collector.tasks / tasks_per_round)
                        }
                        collectors.push(collectorObj);
                    })

                    // create a list of eligible collectors from criteria 1
                    eligibleColIds = criteriaTasks(...collectors);

                    // take coordinates of eligible collectors from db
                    db.query("SELECT id, latitude, longitude FROM collector WHERE id IN (?, ?, ?, ?, ?)", // HARD CODED ----------- (CHECK 1)
                        eligibleColIds, (err, result) => {
                            if (err) {
                                res.send({ error: err });
                            } else {
                                collectors = [];
                                result.map((collector) => {
                                    let collectorObj2 = {
                                        "id": collector.id,
                                        "lat": collector.latitude,
                                        "long": collector.longitude
                                    }
                                    collectors.push(collectorObj2);
                                })

                                // take the unit_id of the bin from db
                                db.query("SELECT unit_id FROM bin WHERE id = ?", binId,
                                    (err, result) => {
                                        if (err) {
                                            res.send({ error: err });
                                        } else {

                                            let unit_id = result[0].unit_id;

                                            // take coordinates of that unit
                                            db.query("SELECT latitude, longitude FROM unit WHERE id = ?", unit_id,
                                                (err, result) => {
                                                    if (err) {
                                                        res.send({ error: err });
                                                    } else {

                                                        let latBin = result[0].latitude;
                                                        let longBin = result[0].longitude;

                                                        // calculate distances using geometry library google maps
                                                        collectors.map((collector) => {
                                                            collector.distance = SphericalUtil.computeDistanceBetween({ 'lat': latBin, 'lng': longBin }, { 'lat': collector.lat, 'lng': collector.long });
                                                        })


                                                        eligibleColIds = [] // empty the previous list

                                                        // find the nearest collector
                                                        eligibleColIds = criteriaDistance(...collectors);

                                                        // if a single collector was selected from above criterias -> add to assign table
                                                        if (eligibleColIds.length === 1) {
                                                            let status = 'sent';
                                                            let collector_id = eligibleColIds[0];
                                                            let time = '21:15' // HARD CODED ------------------------
                                                            db.query("INSERT INTO assign (bin_id, collector_id, status, time) VALUES (?,?,?,?)",
                                                                [binId, collector_id, status, time], (err, result) => {
                                                                    if (err) res.send({ error: err })
                                                                    else {
                                                                        res.send({ message: 'Request sent succesfully' });
                                                                        // IF THIS REQUEST IS THE FIRST ONE FROM THAT UNIT INCREASE 'tasks' OF THAT COLLECTOR (CHECK 2)
                                                                    }
                                                                });

                                                        }
                                                        // if a single selector could not be found from above criterias
                                                        else if (eligibleColIds.length > 1) {
                                                            console.log("no")
                                                        }

                                                    }
                                                })

                                        }
                                    })
                            }

                        })

                }
            })

        }
    })


})

module.exports = Router;