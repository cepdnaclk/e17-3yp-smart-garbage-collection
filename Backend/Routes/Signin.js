const express = require('express');
const db = require("../connection");
const Router = express.Router();
const bcrypt = require('bcrypt');
//const { response, application } = require('express');
const { createTokens, validateToken } = require('../JWT')
const validation = require('../Middlewares/validationMiddleware')
const signinSchema = require('../Validations/signinValidation');
const jwt = require("jsonwebtoken");

const saultRounds = 10; // for pw hashing

Router.post("/", validation(signinSchema), async function (req, res) {


    const username = req.body.adminusername;
    const password = req.body.adminpassword;

    db.query("SELECT * FROM admin WHERE username = ?",
        username,
        (err, result) => {
            if (err) {
                res.status(400).send({ error: err, auth: false });

            }
            if (result.length > 0) {

                bcrypt.compare(password, result[0].password).then((match) => {
                    if (match) {

                        // jwt attempt1

                        // const accessToken = createTokens(result[0]);
                        // res.cookie("access-token", accessToken, {
                        //     maxAge: 60 * 60 * 1 * 1000,
                        //     httpOnly: true // to save from attackers taking the token

                        // });

                        // // cookie expire 1 hours 
                        // res.send({ message: 'successful' });

                        // // send the acess token to the front end
                        // //res.json(accessToken);

                        // jwt attempt2

                        const id = result[0].id;
                        const token = jwt.sign({ id }, "jwtsecret", {
                            expiresIn: 300 * 6,
                        })
                        res.send({ auth: true, token: token, name: result[0].fname });

                    }
                    else {
                        res.send({ error: "Incorrect password", auth: false });

                    }
                })
            }
            else {
                res.send({ error: "User doesn't exist", auth: false });

            }
        });

});



module.exports = Router;