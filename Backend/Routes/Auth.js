const express = require('express');
const Router = express.Router();
const { validateToken } = require('../JWT')

Router.get('/', validateToken, (req, res) => {
    res.json(req.admin);
})

module.exports = Router;