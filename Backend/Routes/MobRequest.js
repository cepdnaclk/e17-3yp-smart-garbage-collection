const express = require('express');
const db = require("../connection");
const Router = express.Router();

Router.get("/request", (req, res) => {
    const collector_id = req.query.collector_ID;
    const admin_id = req.query.admin_ID;
    db.query("SELECT a.request_id,a.admin_id,a.time,b.fname,b.lname FROM assign a,admin b WHERE a.admin_id=b.id && a.status='Sent' && a.collector_id = ?", collector_id, (err, result) => {
        if (err) res.send({ err: err })
        else {
            res.status(200).send(result);
        }
    });
})

Router.post("/accept", (req, res) => {
    const req_id = req.body.request_ID;
    db.query("UPDATE assign SET status='Accepted' WHERE request_id = ?", req_id, (err, result) => {
        if (err) {
            res.status(400).json({ err: err });
            //console.log(err);
        } else {
            res.status(200).json({ status: 'successful' });

        }
    })
})

Router.post("/decline", (req, res) => {
    const req_id = req.body.request_ID;
    db.query("UPDATE assign SET status='Declined' WHERE request_id = ?", req_id, (err, result) => {
        if (err) {
            res.status(400).json({ err: err });
            //console.log(err);
        } else {
            res.status(200).json({ status: 'successful' });

        }
    })
})

//SELECT request_id,admin_id,bin_id,time FROM assign where collector_id = ?",collector_id,
module.exports = Router;