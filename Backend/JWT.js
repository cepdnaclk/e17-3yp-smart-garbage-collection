//const { sign, verify } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");

// const createTokens = (user) => {
//     const accessToken = sign({ username: user.username, id: user.id },
//         "jwtsecret",
//     );

//     return accessToken;
// };

// create middle wear

const validateToken = (req, res, next) => {

    const token = req.headers["x-access-token"]
    if (!token) {
        res.status(400).send({ error: "User not authenticated!" });
    }
    else {
        // jwt.verify(token, "jwtsecret", (err, decoded) => {
        //     if (err) {
        //         res.json({ auth: false, error: "Authentication failed" })
        //     } else {
        //         req.userId = decoded.id; // check
        //         next();
        //     }
        // })

        try {
            const validToken = jwt.verify(token, "jwtsecret");
            if (validToken) {
                return next();
            }
        }
        catch (err) {
            res.json({ auth: false, error: err })
        }

    }

}

// jwt validate attempt 1

// const validateToken = (req, res, next) => {


//     const accessToken = req.cookies["access-token"];

//     // if access token is not in cookies
//     if (!accessToken) {
//         return res.status(400).send({ error: "User not authenticated!" });
//     }

//     // if access token is available
//     // check if valid
//     try {
//         const validToken = verify(accessToken, "jwtsecret");
//         if (validToken) {
//             req.authenticated = true;
//             return next();
//         }

//         // if token is not valid
//     } catch (err) {
//         return res.send({ error: err });
//     }

// }


module.exports = { validateToken };
