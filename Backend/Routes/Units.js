const express = require('express');
const db = require("../connection");
const Router = express.Router();

// add new units 
Router.post("/add", (req, res) => {

    const id = parseInt(req.query.unitID);
    const location = req.body.unitLocation;

    const binCategories = ["Food", "Paper", "Polythene", "Other"];

    // check if a location was given
    if (location != '') {
        // checking if location exists
        db.query("SELECT * FROM unit WHERE location = ?",
            [location],
            (err, result) => {
                if (err) {
                    res.send({ err: err });
                    //console.log(err);
                }
                if (result.length > 0) {
                    res.send({ error: 'Location already exists' });

                }
                else {

                    // succesfully add

                    // initially add a new unit
                    db.query("INSERT INTO unit (id,location) VALUES (?,?)",
                        [id, location],
                        (err, result) => {
                            if (err) {
                                res.send({ err: err });
                            }
                            else {


                                // add four bins for the added unit
                                for (let i = 0; i < 4; i++) {

                                    db.query("INSERT INTO bin (category, unit_id) VALUES (?,?)",
                                        [binCategories[i], id], (err, result) => {
                                            if (err) {
                                                res.send({ err: err });
                                            }
                                        });

                                }

                                // if both the unit and four bins added succesfully
                                res.send({ message: 'successful' });
                            }

                        });

                }


            });

    }


});


// delete a unit
Router.delete("/delete/:id", (req, res) => {

    //const id = parseInt(req.body.unitID);
    const id = req.params.id;


    // check if Id exists
    db.query("SELECT * FROM unit WHERE id = ?",
        id,
        (err, result) => {

            if (err) {
                res.send({ err: err });
            }

            // id found
            else if (result.length > 0) {

                // initiallly delete the four bins of the deleted unit
                db.query("DELETE FROM bin WHERE unit_id = ?",
                    id,
                    (err, result) => {
                        if (err) {
                            res.send({ err: err });
                        }
                        else {

                            // then delete the unit
                            db.query("DELETE FROM unit WHERE id = ?",
                                id,
                                (err, result) => {
                                    if (err) {
                                        res.send({ err: err });
                                    }
                                    else {
                                        res.send({ message: "Successfully deleted" });
                                    }

                                });
                        }

                    });

            }

            // id does not exist
            else {
                res.send({ error: 'Unit Id does not exist' });
            }

        });


});


// get all unit details
Router.get("/getAll", (req, res) => {

    db.query("SELECT * FROM unit", (err, result) => {
        if (err) res.send({ err: err })
        else {
            res.send(result);
            //res.send(result[0].category);
        }
    });
});

// get a unit by id
Router.get("/getById", (req, res) => {

    const id = req.body.unitID;

    db.query("SELECT * FROM unit WHERE id = ?", id, (err, result) => {
        if (err) res.send({ err: err })
        else {
            res.send(result);
            //res.send(result[0].category);
        }
    });
});

// get max id
Router.get("/maxId", (req, res) => {

    db.query("SELECT MAX(id) AS nextId FROM unit", (err, result) => {
        if (err) res.send({ err: err })
        else {
            res.send(result);

        }
    });
});

// to get unit id, unit location,unit latitude, unit longitude, bin category, bin fill level, bin color
// this was used for the map 
Router.get("/get", (req, res) => {

    db.query("SELECT id, location, latitude, longitude FROM unit", (err, result) => {
        if (err) res.send({ err: err });
        else {
            let rows = [];
            result.map((unit) => {
                let id = unit.id;
                let location = unit.location;
                let latitude = unit.latitude;
                let longitude = unit.longitude;
                let binArr = [];
                let fill_levelArr = [];
                let colorArr = []
                db.query("SELECT category, fill_level, color FROM bin WHERE unit_id = ?", id,
                    (err, result) => {
                        if (err) res.send({ err: err });
                        else {

                            for (let i = 0; i < 4; i++) {
                                binArr.push(result[i].category);
                                fill_levelArr.push(result[i].fill_level);
                                colorArr.push(result[i].color);
                            }
                            let dataRow = {
                                "id": id,
                                "location": location,
                                "latitude": latitude,
                                "longitude": longitude,
                                "categories": binArr,
                                "fills": fill_levelArr,
                                "colors": colorArr
                            }
                            rows.push(dataRow);

                        }

                    })
                // res.send(rows);

            })
            res.send(rows);

        }
    })


})



module.exports = Router;


