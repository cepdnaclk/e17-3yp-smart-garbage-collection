const { sign, verify } = require("jsonwebtoken");

const createTokens = (user) => {
    const accessToken = sign({ username: user.username, id: user.id },
        "jwtsecret",
    );

    return accessToken;
};

// create middle wear

const validateToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"];

    // if access token is not in cookies
    if (!accessToken) {
        return res.status(400).send({ error: "User not authenticated!" });
    }

    // if access token is available
    // check if valid
    try {
        const validToken = verify(accessToken, "jwtsecret");
        if (validToken) {
            req.authenticated = true;
            return next();
        }

        // if token is not valid
    } catch (err) {
        return res.status(400).send({ error: err });
    }
};

module.exports = { createTokens, validateToken };
