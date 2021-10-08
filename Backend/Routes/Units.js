const express = require('express');
const db = require("../connection");
const Router = express.Router();

// add new units 
Router.post("/add", (req, res) => {

    const id = parseInt(req.query.unitID);
    const location = req.body.unitLocation;

    const binCategories = ["Food", "Paper", "Polythene", "Other"];

    // if location field is empty
    if (location == '') {
        res.send({ message: 'Please enter location' });
    }

    else {

        // checking if location exists
        db.query("SELECT * FROM unit WHERE location = ?",
            [location],
            (err, result) => {
                if (err) {
                    res.send({ err: err });
                    //console.log(err);
                }
                if (result.length > 0) {
                    res.send({ message: 'Same location already exists' });

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


    // checking if id is a number -----------> try 
    //if (typeof (id) === 'number') {

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
                res.send({ message: 'Unit Id does not exist' });
            }

        });

    //}
    // else {
    //     res.send({ message: 'Enter a number as Id' });
    // }
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



module.exports = Router;


