const express = require('express');
const db = require("../connection");
const Router = express.Router();
const auth = require("../middlewares/auth");
const { createTokens, validateToken } = require('../JWT');

Router.get("/Profile", validateToken, (req, res) => {

    return res.json(req.admin);

    // return res.status(200).send({ message: 'Authorized user!' });
});

module.exports = Router;