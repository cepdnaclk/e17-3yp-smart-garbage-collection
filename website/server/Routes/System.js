const express = require('express');
const db = require("../connection");
const Router = express.Router();

Router.put("/update/binHeight", (req, res) => {

    const binHeight = req.body.binHeight;
    //const binHeight = parseInt(req.body.binHeight);

    if (binHeight != '') {
        db.query("UPDATE systemsettings SET bin_height = ? WHERE id = 1",
            binHeight, (err, result) => {
                if (err) res.send({ err: err });
                else {
                    res.send({ message4: 'Bin height updated' })
                }
            });
    }
});

Router.put("/update/redRange", (req, res) => {

    const red_range = req.body.red_range;

    if (red_range != '') {
        db.query("UPDATE systemsettings SET red_range = ? WHERE id = 1",
            red_range, (err, result) => {
                if (err) res.send({ err: err });
                else {
                    res.send({ message4: 'Red range updated' })
                }
            });
    }

});

Router.put("/update/yellowRange", (req, res) => {

    const yellow_range = req.body.yellow_range;

    if (yellow_range != '') {
        db.query("UPDATE systemsettings SET yellow_range = ? WHERE id = 1",
            yellow_range, (err, result) => {
                if (err) res.send({ err: err });
                else {
                    res.send({ message4: 'yellow range updated' })
                }
            });
    }

});

Router.put("/update/greenRange", (req, res) => {

    const green_range = req.body.green_range;

    if (green_range != '') {
        db.query("UPDATE systemsettings SET green_range = ? WHERE id = 1",
            green_range, (err, result) => {
                if (err) res.send({ err: err });
                else {
                    res.send({ message4: 'green range updated' })
                }
            });

    }
});


module.exports = Router;