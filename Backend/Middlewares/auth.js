const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split('')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, "jwtsecret");
    if (err) return res.sendStatus(403); //forbidden
    req.user = user;

}

function generateAccessToken(id) {
    return jwt.sign({ data: id }, "jwtsecret", {
        expiresIn: "1h"
    });
}

module.exports = {
    authenticateToken,
    generateAccessToken,
};