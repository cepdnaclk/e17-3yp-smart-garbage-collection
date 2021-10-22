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

// FIRST CHECK IF A BIN FROM THE SAME UNIT IS ALREADY ASSIGNED TO SOMEONE -> IF SO CHOOSE THAT COLLECTOR

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

    // FIRST CHECK IF A BIN FROM THE SAME UNIT IS ALREADY ASSIGNED TO SOMEONE -> IF SO CHOOSE THAT COLLECTOR

    // take the unit_id of the bin from db
    db.query("SELECT unit_id FROM bin WHERE id = ?", binId,
        (err, result) => {
            if (err) {
                res.send({ error: err });
            } else {

                let unit_id = result[0].unit_id;

                //take bin id's in this unit
                db.query("SELECT id FROM bin WHERE unit_id = ?", unit_id, (err, result) => {
                    if (err) {
                        res.send({ error: err });
                    } else {

                        let binId1 = result[0].id;
                        let binId2 = result[1].id;
                        let binId3 = result[2].id;
                        let binId4 = result[3].id;

                        // check if active tasks (requests) from this unit is available
                        db.query("SELECT collector_id FROM assign WHERE bin_id IN (?, ?, ?, ?) AND status IN ('Sent', 'Accepted')",
                            [binId1, binId2, binId3, binId4], (err, result) => {
                                if (err) {
                                    res.send({ error: err });
                                } else {
                                    // case 1: active tasks (requests) from this unit are available - Do Assign & tasks++
                                    if (result.length > 0) {
                                        let colId = result[0].collector_id;
                                        let status = 'Sent';
                                        let time = '21:15' // HARD CODED ------------------------
                                        // add to assign table
                                        db.query("INSERT INTO assign (bin_id, collector_id, status, time) VALUES (?,?,?,?)",
                                            [binId, colId, status, time], (err, result) => {
                                                if (err) res.send({ error: err })
                                                else {
                                                    //res.send({ message: 'Request sent succesfully' });
                                                    // *IF THIS REQUEST IS THE FIRST ONE FROM THAT UNIT* INCREASE 'tasks' OF THAT COLLECTOR (CHECK 2)
                                                    db.query("UPDATE collector SET tasks = tasks + 1 WHERE id = ?",
                                                        colId, (err, result) => {
                                                            if (err) res.send({ error: err })
                                                            else {
                                                                res.send({ message: 'Request sent succesfully' });
                                                            }
                                                        })
                                                }
                                            });

                                    }
                                    // case 2: active tasks (requests) from this unit are not available
                                    else {

                                        // GOING FOR THREE CRITERIA SELECTION

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
                                                                                                let status = 'Sent';
                                                                                                let collector_id = eligibleColIds[0];
                                                                                                let time = '21:15' // HARD CODED ------------------------
                                                                                                // add to assign table
                                                                                                db.query("INSERT INTO assign (bin_id, collector_id, status, time) VALUES (?,?,?,?)",
                                                                                                    [binId, collector_id, status, time], (err, result) => {
                                                                                                        if (err) res.send({ error: err })
                                                                                                        else {
                                                                                                            //res.send({ message: 'Request sent succesfully' });
                                                                                                            // *IF THIS REQUEST IS THE FIRST ONE FROM THAT UNIT* INCREASE 'tasks' OF THAT COLLECTOR (CHECK 2)
                                                                                                            db.query("UPDATE collector SET tasks = tasks + 1 WHERE id = ?",
                                                                                                                collector_id, (err, result) => {
                                                                                                                    if (err) res.send({ error: err })
                                                                                                                    else {
                                                                                                                        console.log("hi")
                                                                                                                        res.send({ message: 'Request sent succesfully' });
                                                                                                                    }
                                                                                                                })
                                                                                                        }
                                                                                                    });

                                                                                            }
                                                                                            // CRITERIA 3 - IMPLEMENTED BUT DID NOT CHECK (CHECK 3)
                                                                                            // if a single selector could not be found from above criterias - go for criteria 3
                                                                                            else if (eligibleColIds.length > 1) {
                                                                                                db.query("SELECT zone_id FROM unit WHERE id = ?", unit_id,
                                                                                                    (err, result) => {
                                                                                                        if (err) res.send({ error: err })
                                                                                                        else {
                                                                                                            let zone_id = result[0].zone_id;
                                                                                                            db.query("SELECT collectorid FROM allocate WHERE zoneid = ?", zone_id,
                                                                                                                (err, result) => {
                                                                                                                    if (err) res.send({ error: err })
                                                                                                                    else {
                                                                                                                        let col_id = result[0].collectorid;
                                                                                                                        let status = 'sent';
                                                                                                                        let time = '21:15' // HARD CODED ------------------------
                                                                                                                        db.query("INSERT INTO assign (bin_id, collector_id, status, time) VALUES (?,?,?,?)",
                                                                                                                            [binId, col_id, status, time], (err, result) => {
                                                                                                                                if (err) res.send({ error: err })
                                                                                                                                else {
                                                                                                                                    //res.send({ message: 'Request sent succesfully' });
                                                                                                                                    // *IF THIS REQUEST IS THE FIRST ONE FROM THAT UNIT* INCREASE 'tasks' OF THAT COLLECTOR (CHECK 2)
                                                                                                                                    db.query("UPDATE collector SET tasks = tasks + 1 WHERE id = ?",
                                                                                                                                        col_id, (err, result) => {
                                                                                                                                            if (err) res.send({ error: err })
                                                                                                                                            else {
                                                                                                                                                res.send({ message: 'Request sent succesfully' });
                                                                                                                                            }
                                                                                                                                        })
                                                                                                                                }
                                                                                                                            });

                                                                                                                    }
                                                                                                                })
                                                                                                        }
                                                                                                    })
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

                                    }
                                }
                            })

                    }
                })

            }

        })





})

module.exports = Router;