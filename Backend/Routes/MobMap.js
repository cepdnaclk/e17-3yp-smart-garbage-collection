const express = require('express');
const db = require("../connection");
const Router = express.Router();

//Router.post("/accept", (req, res) => {
    Router.get("/getUnitLocation", (req, res) => {
        const collector_id = req.query.collector_ID;
        const admin_id = req.query.admin_ID;
        db.query("SELECT c.latitude,c.longitude,c.location FROM assign a,bin b,unit c WHERE a.bin_id=b.id && b.unit_id=c.id && (a.status='Accepted' || a.status='Sent') && a.collector_id = ?", collector_id, (err, result) => {
            if (err) res.send({ err: err })
            else {
                res.status(200).send(result);
            }
        });
    })

   module.exports = Router;
